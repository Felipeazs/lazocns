"use client"

import { AlertTriangle, HelpCircle, Info } from "lucide-react"
import { useEffect, useState } from "react"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/client/components/ui/accordion"
import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/client/components/ui/dialog"
import { Progress } from "@/client/components/ui/progress"
import { Slider } from "@/client/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/client/components/ui/tooltip"

// Define the structure for capacity factors and questions
interface CapacityQuestion {
	id: string
	text: string
	importance: number // 0 to 1
	qualification: number // 1 to 4
}

interface CapacityFactor {
	id: string
	name: string
	description: string
	questions: CapacityQuestion[]
}

export default function ORGForm() {
	// Define the hardcoded factors and questions
	const [factors, setFactors] = useState<CapacityFactor[]>([
		{
			id: "people",
			name: "People",
			description: "Evaluation of human resources, skills, and capabilities",
			questions: [
				{
					id: "people-1",
					text: "Does your organization have the right number of people with appropriate skills to achieve its objectives?",
					importance: 0.5,
					qualification: 2,
				},
				{
					id: "people-2",
					text: "Does your organization effectively develop, engage, and retain talented employees?",
					importance: 0.5,
					qualification: 2,
				},
			],
		},
		{
			id: "processes",
			name: "Processes",
			description: "Evaluation of operational procedures and workflows",
			questions: [
				{
					id: "processes-1",
					text: "Are your organization's processes well-documented, efficient, and consistently followed?",
					importance: 0.5,
					qualification: 2,
				},
				{
					id: "processes-2",
					text: "Does your organization regularly review and improve its processes to enhance performance?",
					importance: 0.5,
					qualification: 2,
				},
			],
		},
		{
			id: "technology",
			name: "Technology",
			description: "Evaluation of technological infrastructure and tools",
			questions: [
				{
					id: "technology-1",
					text: "Does your organization have the appropriate technology infrastructure to support its operations?",
					importance: 0.5,
					qualification: 2,
				},
				{
					id: "technology-2",
					text: "Is your organization effectively leveraging technology to improve efficiency and innovation?",
					importance: 0.5,
					qualification: 2,
				},
			],
		},
		{
			id: "culture",
			name: "Culture",
			description: "Evaluation of organizational values, behaviors, and norms",
			questions: [
				{
					id: "culture-1",
					text: "Does your organization have a clearly defined culture that supports its mission and strategy?",
					importance: 0.5,
					qualification: 2,
				},
				{
					id: "culture-2",
					text: "Does your organization's culture promote collaboration, innovation, and continuous improvement?",
					importance: 0.5,
					qualification: 2,
				},
			],
		},
	])

	// Track importance totals for each factor
	const [importanceTotals, setImportanceTotals] = useState<Record<string, number>>({
		people: 1,
		processes: 1,
		technology: 1,
		culture: 1,
	})

	// Calculate importance totals whenever factors change
	useEffect(() => {
		const newTotals: Record<string, number> = {}

		factors.forEach((factor) => {
			newTotals[factor.id] = factor.questions.reduce(
				(sum, question) => sum + question.importance,
				0,
			)
		})

		setImportanceTotals(newTotals)
	}, [factors])

	// Calculate weighted scores for each factor
	const calculateFactorScores = () => {
		return factors.map((factor) => {
			const weightedScores = factor.questions.map((q) => q.importance * q.qualification)
			const totalWeightedScore = weightedScores.reduce((sum, score) => sum + score, 0)

			// Determine capacity level based on total weighted score
			let capacityLevel = ""
			let capacityColor = ""

			if (totalWeightedScore <= 1.75) {
				capacityLevel = "Weak"
				capacityColor = "text-red-600 bg-red-50"
			} else if (totalWeightedScore <= 2.5) {
				capacityLevel = "Limited"
				capacityColor = "text-amber-600 bg-amber-50"
			} else if (totalWeightedScore <= 3.25) {
				capacityLevel = "Moderate"
				capacityColor = "text-blue-600 bg-blue-50"
			} else {
				capacityLevel = "High"
				capacityColor = "text-green-600 bg-green-50"
			}

			return {
				factor,
				weightedScores,
				totalWeightedScore,
				capacityLevel,
				capacityColor,
			}
		})
	}

	const factorScores = calculateFactorScores()

	// Handle importance change for a question
	const handleImportanceChange = (factorId: string, questionId: string, value: number[]) => {
		setFactors((prevFactors) => {
			return prevFactors.map((factor) => {
				if (factor.id === factorId) {
					return {
						...factor,
						questions: factor.questions.map((question) => {
							if (question.id === questionId) {
								return {
									...question,
									importance: value[0],
								}
							}
							return question
						}),
					}
				}
				return factor
			})
		})
	}

	// Handle qualification change for a question
	const handleQualificationChange = (factorId: string, questionId: string, value: number[]) => {
		setFactors((prevFactors) => {
			return prevFactors.map((factor) => {
				if (factor.id === factorId) {
					return {
						...factor,
						questions: factor.questions.map((question) => {
							if (question.id === questionId) {
								return {
									...question,
									qualification: value[0],
								}
							}
							return question
						}),
					}
				}
				return factor
			})
		})
	}

	// Function to normalize importance values for a factor to sum to 1
	const normalizeImportance = (factorId: string) => {
		setFactors((prevFactors) => {
			return prevFactors.map((factor) => {
				if (factor.id === factorId) {
					const totalImportance = factor.questions.reduce((sum, q) => sum + q.importance, 0)

					// If total is already 1 (or very close) or is 0, no need to normalize
					if (Math.abs(totalImportance - 1) < 0.01 || totalImportance === 0) {
						return factor
					}

					return {
						...factor,
						questions: factor.questions.map((question) => ({
							...question,
							importance:
								totalImportance > 0
									? question.importance / totalImportance
									: 1 / factor.questions.length, // Equal distribution if total is 0
						})),
					}
				}
				return factor
			})
		})
	}

	// Get label for qualification value
	const getQualificationLabel = (value: number) => {
		switch (value) {
			case 1:
				return "Poor"
			case 2:
				return "Fair"
			case 3:
				return "Good"
			case 4:
				return "Excellent"
			default:
				return "Fair"
		}
	}

	// Get label for importance value
	const getImportanceLabel = (value: number) => {
		if (value <= 0.25) {
			return "Low"
		}
		if (value <= 0.5) {
			return "Moderate"
		}
		if (value <= 0.75) {
			return "High"
		}
		return "Critical"
	}

	// Get description for capacity level
	const getCapacityDescription = (level: string) => {
		switch (level) {
			case "Weak":
				return "Significant improvement needed. This area represents a major vulnerability for your organization."
			case "Limited":
				return "Basic capacity exists but requires substantial development to meet organizational needs effectively."
			case "Moderate":
				return "Adequate capacity with room for enhancement to achieve optimal performance."
			case "High":
				return "Strong capacity that serves as an organizational strength and competitive advantage."
			default:
				return ""
		}
	}

	return (
		<div className="max-w-[700px] space-y-6 lg:w-[700px]">
			<div className="flex items-center justify-between">
				<h1 className="text-secondary text-3xl font-bold">Organizational Capacity Evaluation</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm" className="flex items-center gap-2">
							<HelpCircle className="h-4 w-4" />
							<span>Help</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Capacity Evaluation Guide</DialogTitle>
							<DialogDescription>
								Understanding how to evaluate organizational capacity
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-6">
							<div>
								<h3 className="mb-2 text-lg font-medium">What is Organizational Capacity?</h3>
								<p className="text-muted-foreground">
									Organizational capacity refers to the ability of an organization to fulfill its
									mission through a blend of sound management, strong governance, and a persistent
									dedication to achieving results.
								</p>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Rating System</h3>
								<p className="text-muted-foreground mb-2">
									Each question is rated on two dimensions:
								</p>
								<ul className="text-muted-foreground list-disc space-y-3 pl-5">
									<li>
										<span className="font-medium">Importance (0-1):</span> How critical this aspect
										is to your organization's success. The sum of importance values for each
										factor's questions must equal 1.
									</li>
									<li>
										<span className="font-medium">Qualification (1-4):</span> How well your
										organization performs in this area.
										<ul className="mt-1 list-disc pl-5">
											<li>
												<span className="font-medium">1 - Poor:</span> Significant deficiencies
												exist
											</li>
											<li>
												<span className="font-medium">2 - Fair:</span> Basic functionality with
												notable gaps
											</li>
											<li>
												<span className="font-medium">3 - Good:</span> Solid performance with minor
												areas for improvement
											</li>
											<li>
												<span className="font-medium">4 - Excellent:</span> Exceptional performance,
												best practice level
											</li>
										</ul>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Capacity Levels</h3>
								<ul className="text-muted-foreground list-disc space-y-1 pl-5">
									<li>
										<span className="font-medium text-red-600">Weak (1.00-1.75):</span> Significant
										improvement needed
									</li>
									<li>
										<span className="font-medium text-amber-600">Limited (1.76-2.50):</span> Basic
										capacity exists but requires development
									</li>
									<li>
										<span className="font-medium text-blue-600">Moderate (2.51-3.25):</span>{" "}
										Adequate capacity with room for enhancement
									</li>
									<li>
										<span className="font-medium text-green-600">High (3.26-4.00):</span> Strong
										capacity and competitive advantage
									</li>
								</ul>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<p className="text-muted-foreground">
				Evaluate your organization's capacity across four key dimensions: People, Processes,
				Technology, and Culture.
			</p>

			<Tabs defaultValue="evaluation" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="evaluation">Evaluation</TabsTrigger>
					<TabsTrigger value="results">Results</TabsTrigger>
				</TabsList>

				<TabsContent value="evaluation" className="mt-6 space-y-6">
					<Accordion type="single" collapsible className="w-full">
						{factors.map((factor) => {
							const isImportanceValid = Math.abs(importanceTotals[factor.id] - 1) <= 0.01

							return (
								<AccordionItem key={factor.id} value={factor.id}>
									<AccordionTrigger className="hover:no-underline">
										<div className="flex flex-col items-start">
											<h3 className="text-lg font-semibold">{factor.name}</h3>
											<p className="text-muted-foreground text-sm">{factor.description}</p>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<Card className="border-t-primary border-t-4">
											<CardHeader>
												<CardTitle className="text-lg">{factor.name} Capacity</CardTitle>
												<CardDescription>{factor.description}</CardDescription>

												<div
													className={`mt-4 flex items-center justify-between rounded-md p-3 ${isImportanceValid ? "border border-green-200 bg-green-50" : "border border-amber-200 bg-amber-50"}`}>
													<div className="flex items-center gap-2">
														{!isImportanceValid && (
															<AlertTriangle className="h-5 w-5 text-amber-500" />
														)}
														<span
															className={`font-medium ${isImportanceValid ? "text-green-700" : "text-amber-700"}`}>
															Total Importance: {importanceTotals[factor.id].toFixed(2)}/1.00
														</span>
													</div>
													{!isImportanceValid && (
														<Button
															variant="outline"
															size="sm"
															onClick={() => normalizeImportance(factor.id)}
															className="border-amber-300 text-amber-700 hover:bg-amber-100">
															Normalize Values
														</Button>
													)}
												</div>
											</CardHeader>
											<CardContent className="space-y-6">
												{factor.questions.map((question, qIndex) => (
													<div key={question.id} className="rounded-md border p-4">
														<div className="mb-4">
															<h4 className="mb-2 text-sm font-medium">Question {qIndex + 1}</h4>
															<p className="text-sm">{question.text}</p>
														</div>

														<div className="space-y-6">
															<div className="space-y-4">
																<div className="flex items-center justify-between">
																	<div className="flex items-center gap-2">
																		<label className="text-sm font-medium">
																			Importance: {getImportanceLabel(question.importance)} (
																			{question.importance.toFixed(2)})
																		</label>
																		<TooltipProvider>
																			<Tooltip>
																				<TooltipTrigger asChild>
																					<Info className="text-muted-foreground h-4 w-4 cursor-help" />
																				</TooltipTrigger>
																				<TooltipContent className="max-w-xs">
																					<p>
																						Importance (0-1) measures how critical this aspect is to
																						your organization. The total importance across all
																						questions must equal 1.
																					</p>
																				</TooltipContent>
																			</Tooltip>
																		</TooltipProvider>
																	</div>
																	<span className="text-muted-foreground text-xs">0 to 1</span>
																</div>
																<Slider
																	max={1}
																	step={0.01}
																	value={[question.importance]}
																	onValueChange={(value) =>
																		handleImportanceChange(factor.id, question.id, value)
																	}
																	className="py-4"
																/>
																<div className="text-muted-foreground flex justify-between text-xs">
																	<span>Low</span>
																	<span>Moderate</span>
																	<span>High</span>
																	<span>Critical</span>
																</div>
															</div>

															<div className="space-y-4">
																<div className="flex items-center justify-between">
																	<div className="flex items-center gap-2">
																		<label className="text-sm font-medium">
																			Qualification: {getQualificationLabel(question.qualification)}{" "}
																			({question.qualification})
																		</label>
																		<TooltipProvider>
																			<Tooltip>
																				<TooltipTrigger asChild>
																					<Info className="text-muted-foreground h-4 w-4 cursor-help" />
																				</TooltipTrigger>
																				<TooltipContent className="max-w-xs">
																					<p>
																						Qualification (1-4) measures how well your organization
																						performs in this area.
																					</p>
																				</TooltipContent>
																			</Tooltip>
																		</TooltipProvider>
																	</div>
																	<span className="text-muted-foreground text-xs">1 to 4</span>
																</div>
																<Slider
																	min={1}
																	max={4}
																	step={1}
																	value={[question.qualification]}
																	onValueChange={(value) =>
																		handleQualificationChange(factor.id, question.id, value)
																	}
																	className="py-4"
																/>
																<div className="text-muted-foreground flex justify-between text-xs">
																	<span>Poor</span>
																	<span>Fair</span>
																	<span>Good</span>
																	<span>Excellent</span>
																</div>
															</div>

															<div className="bg-accent/50 rounded-md p-3">
																<div className="flex items-center justify-between">
																	<span className="text-sm font-medium">Weighted Score:</span>
																	<span className="text-sm font-bold">
																		{(question.importance * question.qualification).toFixed(2)}
																	</span>
																</div>
															</div>
														</div>
													</div>
												))}
											</CardContent>
										</Card>
									</AccordionContent>
								</AccordionItem>
							)
						})}
					</Accordion>
				</TabsContent>

				<TabsContent value="results" className="mt-6 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Organizational Capacity Summary</CardTitle>
							<CardDescription>
								Overview of your organization's capacity across key dimensions
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6 md:grid-cols-2">
								{factorScores.map(
									({ factor, totalWeightedScore, capacityLevel, capacityColor }) => (
										<Card key={factor.id} className="overflow-hidden">
											<div
												className={`h-2 w-full ${capacityColor.split(" ")[0].replace("text", "bg")}`}
											/>
											<CardHeader className="pb-2">
												<CardTitle className="text-lg">{factor.name}</CardTitle>
											</CardHeader>
											<CardContent className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground text-sm">Capacity Level:</span>
													<span
														className={`rounded-md px-2 py-1 text-sm font-medium ${capacityColor}`}>
														{capacityLevel}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground text-sm">Score:</span>
													<span className="text-sm font-bold">
														{totalWeightedScore.toFixed(2)}/4.00
													</span>
												</div>
												<Progress
													value={(totalWeightedScore / 4) * 100}
													className="mt-2 h-2"
													indicatorClassName={capacityColor.split(" ")[0].replace("text", "bg")}
												/>
											</CardContent>
										</Card>
									),
								)}
							</div>

							<div className="mt-8 space-y-6">
								<h3 className="text-xl font-bold">Detailed Analysis</h3>

								{factorScores.map(
									({
										factor,
										weightedScores,
										totalWeightedScore,
										capacityLevel,
										capacityColor,
									}) => (
										<Card key={`detail-${factor.id}`} className="overflow-hidden">
											<div
												className={`h-2 w-full ${capacityColor.split(" ")[0].replace("text", "bg")}`}
											/>
											<CardHeader>
												<div className="flex items-center justify-between">
													<CardTitle>{factor.name}</CardTitle>
													<span
														className={`rounded-md px-2 py-1 text-sm font-medium ${capacityColor}`}>
														{capacityLevel} ({totalWeightedScore.toFixed(2)})
													</span>
												</div>
												<CardDescription>{factor.description}</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="bg-accent/30 rounded-md p-4">
													<h4 className="mb-2 font-medium">Interpretation</h4>
													<p className="text-muted-foreground text-sm">
														{getCapacityDescription(capacityLevel)}
													</p>
												</div>

												<div className="space-y-4">
													<h4 className="font-medium">Question Breakdown</h4>
													{factor.questions.map((question, index) => (
														<div key={question.id} className="rounded-md border p-3">
															<p className="mb-2 text-sm">{question.text}</p>
															<div className="grid grid-cols-3 gap-2 text-sm">
																<div className="bg-accent/30 rounded-md p-2">
																	<span className="text-muted-foreground block text-xs">
																		Importance
																	</span>
																	<span className="font-medium">
																		{question.importance.toFixed(2)}
																	</span>
																</div>
																<div className="bg-accent/30 rounded-md p-2">
																	<span className="text-muted-foreground block text-xs">
																		Qualification
																	</span>
																	<span className="font-medium">
																		{question.qualification} (
																		{getQualificationLabel(question.qualification)})
																	</span>
																</div>
																<div className="bg-primary/10 rounded-md p-2">
																	<span className="text-muted-foreground block text-xs">
																		Weighted Score
																	</span>
																	<span className="font-medium">
																		{weightedScores[index].toFixed(2)}
																	</span>
																</div>
															</div>
														</div>
													))}
												</div>

												<div className="rounded-md border border-dashed p-4">
													<h4 className="mb-2 font-medium">Recommendations</h4>
													<p className="text-muted-foreground text-sm">
														{capacityLevel === "Weak" &&
															"Focus on building fundamental capabilities in this area. Consider developing a comprehensive improvement plan with clear milestones."}
														{capacityLevel === "Limited" &&
															"Work on strengthening existing capabilities and addressing key gaps. Prioritize improvements that will have the most significant impact."}
														{capacityLevel === "Moderate" &&
															"Build on your solid foundation by refining processes and addressing specific areas for improvement. Look for opportunities to innovate."}
														{capacityLevel === "High" &&
															"Maintain your strong position and share best practices across the organization. Consider how you can leverage this strength to improve other areas."}
													</p>
												</div>
											</CardContent>
										</Card>
									),
								)}
							</div>

							<div className="bg-accent mt-8 rounded-md p-4">
								<h3 className="mb-2 text-lg font-bold">Overall Organizational Capacity</h3>
								{(() => {
									const overallScore =
										factorScores.reduce(
											(sum, { totalWeightedScore }) => sum + totalWeightedScore,
											0,
										) / 4
									let overallLevel = ""
									let overallColor = ""

									if (overallScore <= 1.75) {
										overallLevel = "Weak"
										overallColor = "text-red-600"
									} else if (overallScore <= 2.5) {
										overallLevel = "Limited"
										overallColor = "text-amber-600"
									} else if (overallScore <= 3.25) {
										overallLevel = "Moderate"
										overallColor = "text-blue-600"
									} else {
										overallLevel = "High"
										overallColor = "text-green-600"
									}

									return (
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-muted-foreground">Overall Capacity Level:</span>
												<span className={`font-bold ${overallColor}`}>
													{overallLevel} ({overallScore.toFixed(2)}/4.00)
												</span>
											</div>
											<Progress
												value={(overallScore / 4) * 100}
												className="h-3"
												indicatorClassName={overallColor.replace("text", "bg")}
											/>
											<p className="text-muted-foreground mt-4 text-sm">
												{overallLevel === "Weak" &&
													"Your organization has significant capacity challenges that need to be addressed to achieve your mission effectively. Focus on building fundamental capabilities across all dimensions."}
												{overallLevel === "Limited" &&
													"Your organization has basic capacity but requires substantial development to reach its full potential. Prioritize improvements in the weakest areas while strengthening existing capabilities."}
												{overallLevel === "Moderate" &&
													"Your organization has adequate capacity with room for enhancement. Build on your solid foundation by refining processes and addressing specific areas for improvement."}
												{overallLevel === "High" &&
													"Your organization has strong capacity across key dimensions. Maintain your strong position and continue to innovate and improve to stay ahead of changing demands."}
											</p>
										</div>
									)
								})()}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
