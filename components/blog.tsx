import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    title: "Building Scalable Microservices with FastAPI and Docker",
    summary:
      "Learn how to design and implement a scalable microservices architecture using FastAPI, Docker, and modern Python practices.",
    date: "March 15, 2025",
    readTime: "10 min read",
    tags: ["Python", "FastAPI", "Docker", "Microservices"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Full-Stack TypeScript: Building with Next.js and Node.js",
    summary:
      "Explore the benefits of using TypeScript throughout your entire stack, from React frontend to Node.js backend.",
    date: "February 28, 2025",
    readTime: "12 min read",
    tags: ["TypeScript", "Next.js", "Node.js", "Full-Stack"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "React Native vs Flutter: Choosing the Right Mobile Framework",
    summary:
      "A comprehensive comparison of React Native and Flutter for cross-platform mobile development, with code examples and performance metrics.",
    date: "January 20, 2025",
    readTime: "15 min read",
    tags: ["React Native", "Flutter", "Mobile", "Cross-Platform"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Django vs Flask: Choosing the Right Python Web Framework",
    summary:
      "An in-depth analysis of Django and Flask, helping you decide which Python web framework is best suited for your specific project needs.",
    date: "December 12, 2024",
    readTime: "8 min read",
    tags: ["Python", "Django", "Flask", "Web Development"],
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function Blog() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
        <h2 className="text-3xl font-bold mb-4 md:mb-0 relative inline-block fade-in-up">
          Latest Articles
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full"></span>
        </h2>
        <Button variant="outline" className="self-start md:self-auto fade-in-left">
          View All Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            className={`overflow-hidden ${
              index % 4 === 0
                ? "gradient-border"
                : index % 4 === 1
                  ? "gold-border"
                  : index % 4 === 2
                    ? "teal-border"
                    : "coral-border"
            } hover:shadow-md transition-shadow card-hover-effect fade-in-up ${index % 2 === 0 ? "animated-gradient-border" : ""}`}
            style={{ transitionDelay: `${100 + index * 100}ms` }}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader
              className={`${
                index % 4 === 0
                  ? "card-gradient-header"
                  : index % 4 === 1
                    ? "card-gradient-header-teal"
                    : "card-gradient-header-coral"
              }`}
            >
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    className={`text-xs ${
                      i % 5 === 0
                        ? "badge-gradient-primary"
                        : i % 5 === 1
                          ? "badge-gradient-gold"
                          : i % 5 === 2
                            ? "badge-gradient-teal"
                            : i % 5 === 3
                              ? "badge-gradient-coral"
                              : "badge-gradient-lavender"
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle
                className={`line-clamp-2 ${
                  index % 4 === 0
                    ? "purple-gold-gradient"
                    : index % 4 === 1
                      ? "teal-accent-gradient"
                      : index % 4 === 2
                        ? "text-gradient-lavender-primary"
                        : "coral-accent-gradient"
                }`}
              >
                {post.title}
              </CardTitle>
              <CardDescription className="flex items-center text-xs gap-4">
                <span className="flex items-center">
                  <Calendar
                    className={`h-3 w-3 mr-1 ${
                      index % 4 === 0
                        ? "text-primary"
                        : index % 4 === 1
                          ? "text-gold"
                          : index % 4 === 2
                            ? "text-teal"
                            : "text-coral"
                    }`}
                  />
                  {post.date}
                </span>
                <span className="flex items-center">
                  <Clock
                    className={`h-3 w-3 mr-1 ${
                      index % 4 === 0
                        ? "text-primary"
                        : index % 4 === 1
                          ? "text-gold"
                          : index % 4 === 2
                            ? "text-teal"
                            : "text-coral"
                    }`}
                  />
                  {post.readTime}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                className={`px-0 ${
                  index % 4 === 0
                    ? "text-primary"
                    : index % 4 === 1
                      ? "text-gold"
                      : index % 4 === 2
                        ? "text-teal"
                        : "text-coral"
                }`}
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
