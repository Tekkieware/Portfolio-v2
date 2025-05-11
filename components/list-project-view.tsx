"use client"
import { Code, Database, ExternalLink, Github, Layers, Server } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { useRouter } from 'next/navigation'

const projectsData = [
    {
        id: 1,
        slug: "e-commerce-microservices",
        title: "E-Commerce Microservices",
        tagline: "A scalable, cloud-native platform for modern e-commerce businesses",
        description:
            "Built a scalable e-commerce platform using microservices architecture with Python FastAPI, Docker, and React.",
        image: "/placeholder.svg?height=600&width=1200",
        tags: ["Python", "FastAPI", "Docker", "React", "PostgreSQL"],
        github: "https://github.com",
        demo: "https://example.com",
        category: "🌐 Web App",
        color: "primary", // purple
        problem:
            "Traditional monolithic e-commerce platforms struggle with scalability during high-traffic events like sales and product launches. They also present challenges for teams working on different features simultaneously.",
        motivation:
            "I wanted to build a solution that could scale individual components independently and allow teams to work on separate services without tight coupling.",
        features: [
            {
                title: "Microservices Architecture",
                description:
                    "Decomposed the application into specialized services: Product Catalog, User Authentication, Order Processing, Payment Gateway, and Inventory Management.",
                icon: <Layers className="h-6 w-6" />,
            },
            {
                title: "API Gateway",
                description:
                    "Centralized entry point for all client requests, handling routing, authentication, and rate limiting.",
                icon: <Server className="h-6 w-6" />,
            },
            {
                title: "Event-Driven Communication",
                description:
                    "Implemented asynchronous communication between services using RabbitMQ for events like order placement and inventory updates.",
                icon: <Server className="h-6 w-6" />,
            },
        ],
        techStack: [
            { name: "Python", icon: <Code className="h-4 w-4" /> },
            { name: "FastAPI", icon: <Server className="h-4 w-4" /> },
            { name: "React", icon: <Code className="h-4 w-4" /> },
            { name: "Docker", icon: <Layers className="h-4 w-4" /> },
            { name: "Kubernetes", icon: <Layers className="h-4 w-4" /> },
            { name: "PostgreSQL", icon: <Database className="h-4 w-4" /> },
        ],
        challenges: [
            {
                title: "Data Consistency",
                description: "Maintaining data consistency across multiple services was challenging.",
                solution:
                    "Implemented the Saga pattern with compensating transactions to ensure eventual consistency across services.",
            },
            {
                title: "Service Discovery",
                description: "Services needed to locate and communicate with each other in a dynamic environment.",
                solution:
                    "Used Kubernetes service discovery and implemented a service registry for non-Kubernetes deployments.",
            },
        ],
        architecture: {
            diagram: "/placeholder.svg?height=400&width=800",
            description:
                "The architecture follows a microservices pattern with an API Gateway routing requests to appropriate services. Services communicate through both synchronous REST APIs and asynchronous message queues.",
        },
        codeSnippet: {
            language: "python",
            title: "Event Publishing in Order Service",
            code: `async def create_order(order_data: OrderCreate) -> Order:
      # Create order in database
      order = await order_repository.create(order_data)
      
      # Publish event to message queue
      await event_publisher.publish(
          "order_created",
          {
              "order_id": order.id,
              "customer_id": order.customer_id,
              "items": [{"product_id": item.product_id, "quantity": item.quantity} 
                       for item in order.items]
          }
      )
      
      return order`,
        },
        learnings: [
            "Microservices introduce complexity that requires careful planning and robust DevOps practices",
            "Proper service boundaries are critical - we had to refactor two services that were too tightly coupled",
            "Comprehensive monitoring is essential for troubleshooting distributed systems",
            "Local development environment setup is challenging but worth investing in early",
        ],
        improvements:
            "If I were to rebuild this project, I would start with a simpler architecture and gradually decompose into microservices as needed, rather than beginning with a fully distributed system.",
        futurePlans:
            "I plan to add a real-time analytics service and improve the deployment pipeline with canary deployments.",
        links: {
            demo: "https://example.com/demo",
            github: "https://github.com/example/ecommerce-microservices",
            casestudy: "https://example.com/case-study",
        },
    },
    {
        id: 2,
        slug: "task-management-app",
        title: "Task Management App",
        tagline: "A modern, real-time task management solution for teams and individuals",
        description:
            "Full-stack task management application with real-time updates, user authentication, and mobile responsiveness.",
        image: "/placeholder.svg?height=600&width=1200",
        tags: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS"],
        github: "https://github.com",
        demo: "https://example.com",
        category: "📱 Mobile",
        color: "gold",
        problem:
            "Teams struggle with task coordination and visibility across projects. Existing solutions are often complex, slow, and lack real-time collaboration features.",
        motivation:
            "I wanted to create a simple yet powerful task management tool that updates in real-time and works seamlessly across all devices.",
        features: [
            {
                title: "Kanban Board",
                description: "Interactive kanban board with customizable columns and drag-and-drop task management.",
                icon: <Layers className="h-6 w-6" />,
            },
            {
                title: "Real-time Collaboration",
                description: "Live updates when team members create, modify, or complete tasks.",
                icon: <Server className="h-6 w-6" />,
            },
            {
                title: "Task Dependencies",
                description: "Define and visualize task dependencies to manage complex workflows and project timelines.",
                icon: <Code className="h-6 w-6" />,
            },
        ],
        techStack: [
            { name: "TypeScript", icon: <Code className="h-4 w-4" /> },
            { name: "Next.js", icon: <Code className="h-4 w-4" /> },
            { name: "MongoDB", icon: <Database className="h-4 w-4" /> },
            { name: "React Query", icon: <Server className="h-4 w-4" /> },
        ],
        challenges: [
            {
                title: "State Management",
                description: "Managing complex state across multiple components and views was challenging.",
                solution: "Implemented a custom state management solution with React Context and reducers.",
            },
            {
                title: "Performance Optimization",
                description: "The application slowed down significantly with large numbers of tasks and users.",
                solution:
                    "Implemented virtualized lists, pagination, and database indexing to handle thousands of tasks efficiently.",
            },
        ],
        architecture: {
            diagram: "/placeholder.svg?height=400&width=800",
            description:
                "The application uses a Next.js frontend with Server Components for initial rendering and Client Components for interactive elements. React Query handles data fetching and caching, while MongoDB stores the data with appropriate indexing for performance.",
        },
        codeSnippet: {
            language: "typescript",
            title: "Task State Management with React Context",
            code: `// TaskContext.tsx
  import { createContext, useReducer, useContext } from 'react';
  import type { Task, TaskAction } from '@/types';
  
  const TaskContext = createContext<{
    tasks: Task[];
    dispatch: React.Dispatch<TaskAction>;
  } | undefined>(undefined);
  
  function taskReducer(state: Task[], action: TaskAction): Task[] {
    switch (action.type) {
      case 'ADD_TASK':
        return [...state, action.payload];
      case 'UPDATE_TASK':
        return state.map(task => 
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        );
      case 'DELETE_TASK':
        return state.filter(task => task.id !== action.payload.id);
      case 'SET_TASKS':
        return action.payload;
      default:
        return state;
    }
  }
  
  export function TaskProvider({ children, initialTasks = [] }) {
    const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
    
    return (
      <TaskContext.Provider value={{ tasks, dispatch }}>
        {children}
      </TaskContext.Provider>
    );
  }
  
  export function useTasks() {
    const context = useContext(TaskContext);
    if (context === undefined) {
      throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
  }`,
        },
        learnings: [
            "User experience should prioritize speed and simplicity over feature completeness",
            "Early performance testing is crucial to identify bottlenecks before they become problems",
            "Responsive design requires testing on actual devices, not just browser simulations",
            "Proper state management architecture is essential for complex interactive applications",
        ],
        improvements:
            "I would implement a more robust offline-first approach with better conflict resolution for offline changes.",
        futurePlans: "I'm planning to add time tracking features and integration with popular calendar applications.",
        links: {
            demo: "https://example.com/taskapp-demo",
            github: "https://github.com/example/task-management-app",
            casestudy: "https://example.com/taskapp-case-study",
        },
    },
    {
        id: 3,
        slug: "healthcare-api-platform",
        title: "Healthcare API Platform",
        tagline: "Secure, compliant API infrastructure for healthcare applications",
        description:
            "RESTful API platform for healthcare data management with Django, including authentication, authorization, and data validation.",
        image: "/placeholder.svg?height=600&width=1200",
        tags: ["Python", "Django", "Django REST", "JWT", "PostgreSQL"],
        github: "https://github.com",
        demo: "https://example.com",
        category: "🏥 Healthcare",
        color: "teal",
        problem:
            "Healthcare applications need secure, HIPAA-compliant APIs for patient data, but existing solutions are often complex, expensive, or lack proper security controls.",
        motivation:
            "I wanted to create an accessible, developer-friendly API platform that maintains the highest security and compliance standards for healthcare data.",
        features: [
            {
                title: "FHIR Compliance",
                description:
                    "Implementation of Fast Healthcare Interoperability Resources (FHIR) standards for healthcare data exchange.",
                icon: <Server className="h-6 w-6" />,
            },
            {
                title: "Role-Based Access Control",
                description:
                    "Granular permission system with role-based access control for different types of healthcare providers.",
                icon: <Layers className="h-6 w-6" />,
            },
            {
                title: "Audit Logging",
                description: "Comprehensive audit logging of all data access and modifications for compliance and security.",
                icon: <Database className="h-6 w-6" />,
            },
        ],
        techStack: [
            { name: "Python", icon: <Code className="h-4 w-4" /> },
            { name: "Django", icon: <Server className="h-4 w-4" /> },
            { name: "PostgreSQL", icon: <Database className="h-4 w-4" /> },
            { name: "Redis", icon: <Database className="h-4 w-4" /> },
            { name: "Docker", icon: <Layers className="h-4 w-4" /> },
        ],
        challenges: [
            {
                title: "Performance with Encryption",
                description: "Maintaining high performance while implementing end-to-end encryption was challenging.",
                solution: "Optimized database queries and implemented caching strategies to minimize performance impact.",
            },
            {
                title: "Complex Authorization Logic",
                description:
                    "Healthcare data requires complex authorization rules based on provider roles, patient relationships, and data sensitivity.",
                solution:
                    "Developed a flexible policy engine using attribute-based access control (ABAC) to handle complex authorization scenarios.",
            },
        ],
        architecture: {
            diagram: "/placeholder.svg?height=400&width=800",
            description:
                "The platform uses Django with Django REST Framework for the API layer, with a custom authorization middleware. PostgreSQL stores encrypted data, while Redis handles caching and rate limiting.",
        },
        codeSnippet: {
            language: "python",
            title: "Attribute-Based Access Control Implementation",
            code: `class HealthcareAccessPolicy:
      def has_permission(self, request, view):
          # Basic authentication check
          if not request.user.is_authenticated:
              return False
              
          # Get the required permission for this view
          required_permission = getattr(view, 'required_permission', None)
          if not required_permission:
              return True
              
          # Check user role
          if request.user.is_admin:
              return True
              
          # For patient data access
          if 'patient_id' in view.kwargs:
              patient_id = view.kwargs['patient_id']
              
              # Check if user is the patient
              if request.user.is_patient and request.user.patient_id == patient_id:
                  return True
                  
              # Check if user is a provider with relationship to patient
              if request.user.is_provider:
                  return PatientProviderRelationship.objects.filter(
                      patient_id=patient_id,
                      provider_id=request.user.provider_id,
                      relationship_active=True
                  ).exists()
                  
          return False`,
        },
        learnings: [
            "Healthcare compliance requirements significantly impact technical architecture decisions",
            "Proper API design and documentation dramatically improves developer adoption",
            "Security must be built into every layer of the application, not added as an afterthought",
            "Performance optimization is crucial when working with large healthcare datasets",
        ],
        improvements:
            "I would implement a more comprehensive test suite with better coverage of edge cases and security scenarios.",
        futurePlans:
            "I'm planning to add support for additional healthcare standards and improve the developer onboarding experience.",
        links: {
            demo: "https://example.com/healthcare-api-demo",
            github: "https://github.com/example/healthcare-api-platform",
            casestudy: "https://example.com/healthcare-api-case-study",
        },
    },
    {
        id: 4,
        slug: "mobile-fitness-tracker",
        title: "Mobile Fitness Tracker",
        tagline: "Your personal fitness companion for tracking workouts and achieving goals",
        description:
            "Cross-platform mobile application for fitness tracking with workout plans, progress monitoring, and social features.",
        image: "/placeholder.svg?height=600&width=1200",
        tags: ["React Native", "TypeScript", "Firebase", "Redux"],
        github: "https://github.com",
        demo: "https://example.com",
        category: "💪 Fitness",
        color: "coral",
        problem:
            "Existing fitness apps are often too complex, lack personalization, or don't provide enough motivation for users to maintain their fitness routines.",
        motivation:
            "I wanted to create a fitness app that combines simplicity with powerful tracking and motivational features to help users stay consistent with their workouts.",
        features: [
            {
                title: "Workout Tracking",
                description: "Track exercises, sets, reps, and weights with automatic rest timers and personal records.",
                icon: <Layers className="h-6 w-6" />,
            },
            {
                title: "Progress Analytics",
                description:
                    "Visual charts and graphs showing progress over time for different exercises and body measurements.",
                icon: <Server className="h-6 w-6" />,
            },
            {
                title: "AI Workout Recommendations",
                description: "Personalized workout recommendations based on goals, available equipment, and fitness level.",
                icon: <Code className="h-6 w-6" />,
            },
        ],
        techStack: [
            { name: "React Native", icon: <Code className="h-4 w-4" /> },
            { name: "TypeScript", icon: <Code className="h-4 w-4" /> },
            { name: "Firebase", icon: <Database className="h-4 w-4" /> },
            { name: "Redux", icon: <Layers className="h-4 w-4" /> },
        ],
        challenges: [
            {
                title: "Offline Synchronization",
                description: "Managing data conflicts when users make changes offline that conflict with server data.",
                solution:
                    "Implemented a conflict resolution system with timestamps and merge strategies to handle data conflicts gracefully.",
            },
            {
                title: "Cross-Platform Performance",
                description: "Ensuring smooth performance on both iOS and Android, especially for animation-heavy screens.",
                solution:
                    "Optimized React Native components, implemented native modules for performance-critical features, and used Hermes JavaScript engine.",
            },
        ],
        architecture: {
            diagram: "/placeholder.svg?height=400&width=800",
            description:
                "The app uses React Native for cross-platform compatibility, with Redux for state management. Firebase provides authentication, real-time database, and cloud functions for server-side logic.",
        },
        codeSnippet: {
            language: "typescript",
            title: "Offline-First Workout Tracking",
            code: `// Save workout with offline support
  export const saveWorkout = (workout: Workout) => async (
    dispatch: AppDispatch,
    getState: () => RootState
  ) => {
    const { user } = getState().auth;
    if (!user) return;
  
    // Generate unique ID if new workout
    const workoutId = workout.id || uuidv4();
    const workoutWithId = { ...workout, id: workoutId };
    
    // Add to local queue and update UI immediately
    dispatch(addWorkoutToQueue(workoutWithId));
    dispatch(updateLocalWorkout(workoutWithId));
    
    // Try to sync with server if online
    if (navigator.onLine) {
      try {
        await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('workouts')
          .doc(workoutId)
          .set({
            ...workoutWithId,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            synced: true
          });
          
        // Mark as synced in local state
        dispatch(markWorkoutSynced(workoutId));
      } catch (error) {
        console.error('Error saving workout:', error);
        // Keep in queue for later sync
      }
    }
  };`,
        },
        learnings: [
            "User onboarding is critical for fitness apps - we saw a 40% increase in retention after improving this flow",
            "Social features drive engagement but require careful privacy considerations",
            "Performance optimization on lower-end Android devices is essential for global markets",
            "Offline functionality is more important to users than we initially anticipated",
        ],
        improvements:
            "I would implement a more comprehensive exercise database with better search and filtering capabilities.",
        futurePlans: "I'm planning to add integration with wearable devices and improve the social challenges feature.",
        links: {
            demo: "https://example.com/fitness-app-demo",
            github: "https://github.com/example/mobile-fitness-tracker",
            casestudy: "https://example.com/fitness-app-case-study",
        },
    },
    {
        id: 5,
        slug: "real-time-chat-application",
        title: "Real-time Chat Application",
        tagline: "Secure, feature-rich messaging platform for teams and communities",
        description:
            "Scalable real-time chat application with private messaging, group chats, and file sharing capabilities.",
        image: "/placeholder.svg?height=600&width=1200",
        tags: ["JavaScript", "Express", "MongoDB", "React"],
        github: "https://github.com",
        demo: "https://example.com",
        category: "💬 Communication",
        color: "lavender",
        problem:
            "Teams need secure, reliable communication tools that integrate with their workflows, but many existing solutions lack customization options or have privacy concerns.",
        motivation:
            "I wanted to build a messaging platform that prioritizes privacy, reliability, and extensibility for team communication.",
        features: [
            {
                title: "Real-time Messaging",
                description: "Instant message delivery with typing indicators, read receipts, and presence status.",
                icon: <Server className="h-6 w-6" />,
            },
            {
                title: "End-to-End Encryption",
                description: "Messages encrypted on the client side before transmission, ensuring privacy and security.",
                icon: <Layers className="h-6 w-6" />,
            },
            {
                title: "Rich Media Sharing",
                description: "Share images, videos, documents, and code snippets with preview capabilities.",
                icon: <Database className="h-6 w-6" />,
            },
        ],
        techStack: [
            { name: "JavaScript", icon: <Code className="h-4 w-4" /> },
            { name: "Express", icon: <Server className="h-4 w-4" /> },
            { name: "MongoDB", icon: <Database className="h-4 w-4" /> },
            { name: "React", icon: <Code className="h-4 w-4" /> },
        ],
        challenges: [
            {
                title: "Real-time Updates",
                description: "Implementing efficient real-time updates without overwhelming the server or client.",
                solution:
                    "Used a combination of long-polling and WebHooks for real-time updates with fallback mechanisms for different network conditions.",
            },
            {
                title: "Message Delivery Reliability",
                description: "Ensuring reliable message delivery even with unstable network connections.",
                solution:
                    "Developed a message queue system with acknowledgments, retries, and offline message storage for delivery when clients reconnect.",
            },
        ],
        architecture: {
            diagram: "/placeholder.svg?height=400&width=800",
            description:
                "The application uses a Node.js backend with Express for the API layer. MongoDB stores message history, while Redis handles caching and pub/sub for scaling across multiple server instances.",
        },
        codeSnippet: {
            language: "javascript",
            title: "Reliable Message Delivery System",
            code: `// Server-side message handling with delivery guarantees
  app.post('/api/messages', async (req, res) => {
    try {
      const { content, recipientId } = req.body;
      const userId = req.user.id;
      
      // Save message to database
      const message = await Message.create({
        sender: userId,
        recipient: recipientId,
        content,
        status: 'sent',
        timestamp: new Date()
      });
      
      // Queue message for delivery
      await messageQueue.add('deliver-message', {
        messageId: message._id,
        recipientId,
        attempts: 0,
        maxAttempts: 5
      }, {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000
        }
      });
      
      res.status(201).json({
        id: message._id,
        status: 'queued',
        timestamp: message.timestamp
      });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });
  
  // Message delivery worker
  messageQueue.process('deliver-message', async (job) => {
    const { messageId, recipientId, attempts } = job.data;
    
    try {
      // Get recipient's device tokens
      const user = await User.findById(recipientId);
      
      if (!user || !user.deviceTokens.length) {
        // No devices to deliver to, mark as pending
        await Message.findByIdAndUpdate(messageId, { status: 'pending' });
        return { status: 'pending', reason: 'no-devices' };
      }
      
      // Try to deliver to each device
      const deliveryPromises = user.deviceTokens.map(token => 
        notificationService.sendNotification(token, messageId)
      );
      
      const results = await Promise.allSettled(deliveryPromises);
      const anySuccess = results.some(r => r.status === 'fulfilled');
      
      if (anySuccess) {
        // At least one device received the message
        await Message.findByIdAndUpdate(messageId, { status: 'delivered' });
        return { status: 'delivered' };
      } else {
        // All devices failed, retry or mark as failed
        if (attempts >= 5) {
          await Message.findByIdAndUpdate(messageId, { status: 'failed' });
          return { status: 'failed', reason: 'max-attempts' };
        }
        
        throw new Error('Delivery failed, will retry');
      }
    } catch (error) {
      console.error(\`Attempt \${attempts} failed for message \${messageId}:\`, error);
      throw error; // This will trigger a retry based on the queue settings
    }
  });`,
        },
        learnings: [
            "Reliable message delivery requires multiple fallback mechanisms and careful error handling",
            "End-to-end encryption adds complexity but is essential for privacy-focused applications",
            "Offline support and reconnection strategies are critical for mobile user experience",
            "Caching and message batching significantly improve performance under high load",
        ],
        improvements:
            "I would implement a more robust notification system with better support for mobile push notifications.",
        futurePlans: "I'm planning to add voice and video calling features and improve the file sharing capabilities.",
        links: {
            demo: "https://example.com/chat-app-demo",
            github: "https://github.com/example/real-time-chat-application",
            casestudy: "https://example.com/chat-app-case-study",
        },
    },
    {
        id: 6,
        slug: "content-management-system",
        title: "Content Management System",
        tagline: "A flexible, API-first content management system for modern digital experiences",
        description:
            "Headless CMS with a modern admin interface, content modeling, and API-first approach for multi-platform publishing.",
        image: "/placeholder.svg?height=600&width=1200",
        tags: ["TypeScript", "Next.js", "GraphQL", "PostgreSQL"],
        github: "https://github.com",
        demo: "https://example.com",
        category: "📝 CMS",
        color: "primary",
        problem:
            "Traditional CMSes are often rigid, difficult to customize, and not optimized for modern multi-channel content delivery needs.",
        motivation:
            "I wanted to create a flexible, developer-friendly CMS that separates content management from presentation, enabling delivery to any platform.",
        features: [
            {
                title: "Content Modeling",
                description:
                    "Flexible content modeling system allowing users to define custom content types and relationships.",
                icon: <Database className="h-6 w-6" />,
            },
            {
                title: "GraphQL API",
                description:
                    "Powerful GraphQL API with filtering, pagination, and nested queries for efficient content delivery.",
                icon: <Server className="h-6 w-6" />,
            },
            {
                title: "WYSIWYG Editor",
                description:
                    "Modern block-based editor with support for rich media, custom components, and collaborative editing.",
                icon: <Code className="h-6 w-6" />,
            },
        ],
        techStack: [
            { name: "TypeScript", icon: <Code className="h-4 w-4" /> },
            { name: "Next.js", icon: <Code className="h-4 w-4" /> },
            { name: "GraphQL", icon: <Server className="h-4 w-4" /> },
            { name: "PostgreSQL", icon: <Database className="h-4 w-4" /> },
        ],
        challenges: [
            {
                title: "Content Versioning",
                description: "Implementing an efficient versioning system for content without excessive database growth.",
                solution:
                    "Developed a hybrid approach using JSON diffs for minor changes and full snapshots for major versions.",
            },
            {
                title: "GraphQL Performance",
                description: "Preventing performance issues with deeply nested or complex GraphQL queries.",
                solution:
                    "Implemented query complexity analysis, depth limiting, and dataloader batching to optimize database access.",
            },
        ],
        architecture: {
            diagram: "/placeholder.svg?height=400&width=800",
            description:
                "The CMS uses a Next.js frontend with a GraphQL API layer. PostgreSQL stores content data, with a separate service for media asset management.",
        },
        codeSnippet: {
            language: "typescript",
            title: "GraphQL Query Complexity Analysis",
            code: `import { GraphQLSchema } from 'graphql';
  import { getComplexity, simpleEstimator } from 'graphql-query-complexity';
  
  // Set up query complexity analysis middleware
  export const complexityMiddleware = (schema: GraphQLSchema) => {
    return async (req, res, next) => {
      const query = req.body.query;
      if (!query) return next();
      
      try {
        // Parse the query and calculate complexity
        const complexity = getComplexity({
          schema,
          query,
          variables: req.body.variables,
          estimators: [
            // Configure complexity rules
            simpleEstimator({
              defaultComplexity: 1,
              fieldConfigComplexity: {
                // Higher cost for expensive operations
                'Query.contentItems': 10,
                'ContentItem.relatedItems': 5,
                'ContentItem.versions': 5,
                // Pagination reduces complexity
                'PaginatedResult.items': ({ args }) => {
                  const limit = args.limit || 10;
                  return Math.min(limit, 50); // Cap at 50
                }
              }
            })
          ]
        });
        
        // Set complexity threshold based on user role
        const maxComplexity = req.user.isAdmin ? 2000 : 1000;
        
        if (complexity > maxComplexity) {
          return res.status(400).json({
            errors: [{
              message: \`Query complexity too high: \${complexity}. Maximum allowed: \${maxComplexity}\`
            }]
          });
        }
  
        // Add complexity to request for logging
        req.queryComplexity = complexity;
        next();
      } catch (error) {
        next(error);
      }
    };
  };`,
        },
        learnings: [
            "Content modeling flexibility is crucial but requires careful UI design to remain user-friendly",
            "GraphQL provides significant developer experience benefits but requires performance considerations",
            "Content editors prioritize workflow efficiency over feature abundance",
            "Plugin architecture decisions have long-lasting implications for system extensibility",
        ],
        improvements: "I would implement a more robust permissions system with better support for multi-tenant scenarios.",
        futurePlans:
            "I'm planning to add AI-powered content recommendations and improve the media management capabilities.",
        links: {
            demo: "https://example.com/cms-demo",
            github: "https://github.com/example/content-management-system",
            casestudy: "https://example.com/cms-case-study",
        },
    },
]
const ListProjectView = () => {
    const router = useRouter()
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                            <Card
                                key={project.id}
                                className={cn(
                                    "overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300",
                                    project.color === "primary"
                                        ? "border-primary/50"
                                        : project.color === "gold"
                                            ? "border-gold/50"
                                            : project.color === "teal"
                                                ? "border-teal/50"
                                                : project.color === "coral"
                                                    ? "border-coral/50"
                                                    : "border-lavender/50",
                                )}
                                onClick={() => router.push(`/projects/${project.id}`)}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                                    <img
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                    />
                                    <div className="absolute top-3 left-3 z-20">
                                        <Badge
                                            className={cn(
                                                "text-xs px-3 py-1",
                                                project.color === "primary"
                                                    ? "bg-primary text-white"
                                                    : project.color === "gold"
                                                        ? "bg-gold text-black"
                                                        : project.color === "teal"
                                                            ? "bg-teal text-white"
                                                            : project.color === "coral"
                                                                ? "bg-coral text-white"
                                                                : "bg-lavender text-black",
                                            )}
                                        >
                                            {project.category}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle
                                        className={cn(
                                            "line-clamp-1",
                                            project.color === "primary"
                                                ? "text-primary"
                                                : project.color === "gold"
                                                    ? "text-gold"
                                                    : project.color === "teal"
                                                        ? "text-teal"
                                                        : project.color === "coral"
                                                            ? "text-coral"
                                                            : "text-lavender",
                                        )}
                                    >
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map((tag: string, i: number) => (
                                            <Badge
                                                key={i}
                                                variant="outline"
                                                className={cn(
                                                    "text-xs",
                                                    project.color === "primary"
                                                        ? "border-primary/50 text-primary"
                                                        : project.color === "gold"
                                                            ? "border-gold/50 text-gold"
                                                            : project.color === "teal"
                                                                ? "border-teal/50 text-teal"
                                                                : project.color === "coral"
                                                                    ? "border-coral/50 text-coral"
                                                                    : "border-lavender/50 text-lavender",
                                                )}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{project.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="group"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            window.open(project.github, "_blank", "noopener,noreferrer")
                                        }}
                                    >
                                        <Github className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                                        GitHub
                                    </Button>
                                    <Button
                                        size="sm"
                                        className={cn(
                                            "group relative overflow-hidden",
                                            project.color === "primary"
                                                ? "bg-primary hover:bg-primary/90 text-white"
                                                : project.color === "gold"
                                                    ? "bg-gold hover:bg-gold/90 text-black"
                                                    : project.color === "teal"
                                                        ? "bg-teal hover:bg-teal/90 text-white"
                                                        : project.color === "coral"
                                                            ? "bg-coral hover:bg-coral/90 text-white"
                                                            : "bg-lavender hover:bg-lavender/90 text-black",
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            window.open(project.demo, "_blank", "noopener,noreferrer")
                                        }}
                                    >
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                </div>
            </div>
        </section>
    )
}

export default ListProjectView