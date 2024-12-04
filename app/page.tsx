import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Rocket, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome to the Miniblocks User Guide! 🌟
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Let&apos;s explore and learn together in this fun mobile application adventure!
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transform transition-transform hover:scale-105">
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Start Learning</CardTitle>
              <CardDescription>Begin your exciting journey here!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </CardContent>
          </Card>
          <Card className="transform transition-transform hover:scale-105">
            <CardHeader>
              <Rocket className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Sample Activities</CardTitle>
              <CardDescription>Discover amazing games and activities!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Explore Activities
              </Button>
            </CardContent>
          </Card>
          <Card className="transform transition-transform hover:scale-105">
            <CardHeader>
              <Star className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Cool Features</CardTitle>
              <CardDescription>Check out all the awesome features!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                See Features
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}