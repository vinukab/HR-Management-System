"use client"

import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProjectDetails() {
  const projects = [
    {
      name: "Website Redesign",
      description: "Revamping the corporate website to improve UI/UX.",
      deadline: "2024-12-01",
      progress: 65,
      status: "In Progress",
    },
    {
      name: "Mobile App Development",
      description: "Developing a mobile application for customer engagement.",
      deadline: "2025-01-15",
      progress: 45,
      status: "In Progress",
    },
    {
      name: "Marketing Campaign",
      description: "Executing the Q4 digital marketing strategy.",
      deadline: "2024-11-10",
      progress: 85,
      status: "Almost Complete",
    },
    {
      name: "Cloud Migration",
      description: "Migrating existing infrastructure to AWS cloud.",
      deadline: "2025-03-01",
      progress: 20,
      status: "Planning",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {projects.map((project, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Deadline:</span> {project.deadline}
            </div>
            <div className="mb-2 text-sm">
              <span className="font-semibold">Status:</span> {project.status}
            </div>
            <Progress value={project.progress} className="h-2" />
            <div className="mt-2 text-xs">{project.progress}% Complete</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
