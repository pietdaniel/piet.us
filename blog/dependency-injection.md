Dependency Injection
===

# Intro

I wrote this out initially as part of a mentoring program we do at Rokt. The write-up
wasn't absolutely awful so I figured I'd publish it here. This blog is on dependency
injection, some of my personal thoughts on the topic, how dependency injection can
happen in Golang, and a little bit on Uber's fx library.

# 1. What is Dependency injection?

Dependency Injection (DI) is a design pattern in which an object's dependencies are
'injected' into it, rather than the object creating its own dependencies. This is
often done via constructors, methods, or properties. This provides value in:

  - **Decoupling of Components**: Components become less reliant on each other, leading to a more modular and maintainable codebase.
  - **Testability**: By injecting dependencies, we can easily provide mock objects for testing, making unit tests more straightforward and isolated.
  - **Flexibility & Reusability**: Components become more generic and can work with any dependency that adheres to the required contract (interface in the case of Go). This means they can be reused in different contexts or with different implementations of the same dependency.
  - **Configuration and Service Management**: Especially in larger systems, managing configurations and services centrally becomes easier, as these can be injected as needed, rather than being scattered or duplicated throughout the code.

This is in lieu of hard coding dependencies, when an object directly instantiates
or references its dependencies, tying it closely to specific implementations. By
hard coding you end up with:

- **Rigidity**: The code becomes less flexible to changes. If you want to swap out a dependency or change its configuration, you might need to make changes across multiple parts of the code.
- **Testing Challenges**: Testing components in isolation becomes harder. If a component creates its own database connection, for example, how do you test it without connecting to that database?
- **Maintenance**: As the codebase grows, the intertwined nature of hard-coded dependencies can lead to more challenging maintenance and potential bugs.

Example: If you directly instantiate a database connection inside a service, then
that service is hard-coded to that specific database implementation. Want to change
databases or use a mock database for testing? It'll require code changes and could
introduce errors.

##### Dependency Injection & Inversion of Control

- **Traditional Control**: In traditional software design, a class that needs to utilize a service (e.g., a logging service) would directly create or call that service. This means the class has a direct dependency on that specific service.
- **Inverting the Control**: With Inversion of Control, the class doesn't look for the service or create it directly. Instead, the service is "handed" to the class, typically through a constructor or a method. The control of which service to use is inverted – rather than the class controlling which service it uses, something external controls which service is provided to the class.
- **Dependency Injection as a Form of IoC**: DI is a technique to achieve IoC. By injecting the dependencies (like our logging service) into a class rather than having the class create them, we invert control and decouple our components. This decoupling means changing one component has minimal impact on others.

Dependency Injection (DI) is a powerful technique that can improve software design
by promoting separation of concerns, modularity, and testability. However, like most
architectural choices, it has its downsides. Here are some disadvantages of using
DI:

- **Complexity**: One of the main criticisms of DI, especially when a DI framework is used, is that it can add complexity to the code. This complexity might be daunting for newcomers or for those who aren't familiar with the concept.
- **Learning Curve**: For developers who haven't worked with DI before, there's a learning curve involved, both for the DI concept and for any DI frameworks being used.
- **Verbose Configuration**: Depending on how DI is set up, it may require verbose configuration. This can be particularly true for XML-based configurations in some frameworks. While annotation or code-based configurations can alleviate this to some extent, they come with their own set of trade-offs.
- **Runtime Overhead**: DI frameworks introduce a small runtime overhead during the object creation phase. This might not be significant for many applications, but in highly performance-sensitive applications, it can matter.
- **Debugging Challenges**: Errors related to DI, especially when using a framework, can be cryptic. For example, if you forget to provide a necessary dependency or misconfigure something, the error messages can be challenging to decipher.
- **Tight Coupling to DI Framework**: When using a DI framework, there's a risk of tightly coupling the application code to the specific framework. This can make it harder to switch to a different framework or to remove the framework altogether in the future.
- **Overhead of Abstraction**: While abstraction is a strength of DI, it can sometimes be its weakness. Over-abstraction can lead to situations where there are so many interfaces and implementations that it becomes hard to track the actual behavior of the system.
- **Can Mask Design Smells**: If every component can easily get any dependency it asks for, it can mask design smells like too many dependencies for a single class. This can be a symptom of violating the Single Responsibility Principle.
- **Increased Startup Time**: DI containers often do a lot of work during application startup, like scanning the classpath, reading configurations, and creating initial objects. This can increase the startup time of the application.
- **Potential Overuse**: Like any tool or pattern, there's the risk of overusing DI. Not every single object or dependency needs to be injected. Overusing DI can lead to an over-engineered solution.

#### Examples

##### Hardcoded

Here we have a hardcoded dependency.

```go
package main

import "fmt"

type EmailSender struct{}

func (e *EmailSender) Send(message string) {
	fmt.Println("Sending Email:", message)
}

type MessageService struct {
	sender *EmailSender
}

func NewMessageService() *MessageService {
	// Here we hard code the dependency
	return &MessageService{sender: &EmailSender{}}
}

func (ms *MessageService) SendMessage(message string) {
	ms.sender.Send(message)
}

func main() {
	service := NewMessageService()
	service.SendMessage("Hello with hard-coded dependency!")
}
```

##### Constructor Dependency Injection

Here is a the same dependency "injected" via the constructor.

```go
package main

import "fmt"

type Sender interface {
	Send(message string)
}

type EmailSender struct{}

func (e *EmailSender) Send(message string) {
	fmt.Println("Sending Email:", message)
}

type SMSSender struct{}

func (s *SMSSender) Send(message string) {
	fmt.Println("Sending SMS:", message)
}

type MessageService struct {
	sender Sender
}

func NewMessageService(s Sender) *MessageService {
	return &MessageService{sender: s}
}

func (ms *MessageService) SendMessage(message string) {
	ms.sender.Send(message)
}

func main() {
	// Here we inject the dependency in the constructor
	emailService := NewMessageService(&EmailSender{})
	emailService.SendMessage("Hello with DI!")

	smsService := NewMessageService(&SMSSender{})
	smsService.SendMessage("Hello again with DI!")
}
```

##### fx Example

Here we use fx to inject the dependency.

```go
package main

import (
	"fmt"
	"log"
	"go.uber.org/fx"
)

// Sender interface
type Sender interface {
	Send(message string)
}

// EmailSender struct
type EmailSender struct{}

func (e *EmailSender) Send(message string) {
	fmt.Println("Sending Email:", message)
}

// SMSSender struct
type SMSSender struct{}

func (s *SMSSender) Send(message string) {
	fmt.Println("Sending SMS:", message)
}

// MessageService struct
type MessageService struct {
	sender Sender
}

func NewMessageService(s Sender) *MessageService {
	return &MessageService{sender: s}
}

func (ms *MessageService) SendMessage(message string) {
	ms.sender.Send(message)
}

func ProvideSender() Sender {
	// For demonstration, we're just providing EmailSender, but this could be any type
that implements Sender.
	return &EmailSender{}
}

func main() {
	app := fx.New(
		fx.Provide(ProvideSender),
		fx.Provide(NewMessageService),
		fx.Invoke(func(ms *MessageService) {
			ms.SendMessage("Hello with fx DI!")
		}),
	)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
```

##### Python

```python
# Without DI
class ReportGenerator:
    def __init__(self):
        self.data_loader = DataLoader()

# With DI
class ReportGenerator:
    def __init__(self, data_loader):
        self.data_loader = data_loader
```

When I first learned about Dependency Injection it was via [Google's Guice](https://github.com/google/guice) library.
This made the concept magical to me but at its core dependency injection is relatively
simple. It's basically the strategy pattern. It gets confusing when you utilize libraries
which add a ton of functionality and provide dependencies in novel and complex ways.

# 2. Go's Approach to DI

##### Interface-based Design:

What are Interfaces in Go?

Go doesn't have classes or inheritance in the traditional sense. Instead, it has
interfaces, which are collections of method signatures. A type implicitly satisfies
an interface if it defines all the required methods.

##### How Interfaces aid DI:

- **Decoupling**: By depending on interfaces (abstracted behavior) rather than concrete types, Go promotes loose coupling. This is the essence of DI, where components depend on abstractions and not on actual implementations.
- **Flexibility**: Interfaces in Go don't require explicit declarations, meaning any type that satisfies the methods of an interface can be used in place of that interface. This makes it easy to swap out implementations, making the system more modular and extensible.
- **Testability**: When you design components to depend on interfaces, you can easily mock those interfaces during testing. In Go, creating mock implementations for interfaces is straightforward, enabling easier unit testing.

```go
// An interface for a data store
type DataStorer interface {
    Store(data string) error
}

// A real implementation of the data store
type Database struct {}

func (db Database) Store(data string) error {
    // Store in a real database
    return nil
}

// A mock implementation for testing
type MockDatabase struct {}


func (mdb MockDatabase) Store(data string) error {
    // Mock the storage
    return nil
}

// A service that depends on the DataStorer interface
type Service struct {
    dataStorer DataStorer
}

// Injecting a real database
realService := Service{dataStorer: Database{}}

// Injecting a mock database for testing
mockService := Service{dataStorer: MockDatabase{}}
```

# 3. Introduction to the fx library

#### What is the fx Library?

- fx is a comprehensive framework provided by Uber that is designed to assist in building applications in Go, with a strong emphasis on Dependency Injection (DI).
- Instead of manually wiring components together, fx facilitates the automatic construction of the dependency graph, making it easier to initiate and connect various components in your application.

#### Main Benefits of the fx Library:

*Simplified Dependency Management*

Automatic Construction: fx automatically builds the dependency graph based on the
provided constructors, alleviating the need to manually wire dependencies.
Lifecycle Management: The library offers lifecycle hooks (like Start and Stop), allowing
developers to manage resource setup and teardown effortlessly.

*Enhanced Flexibility and Modularity*

You can group components into modules, making it easy to reuse, share, and isolate
functionality. This modular approach is especially beneficial for larger applications
or shared libraries.

*Error Reduction*

fx checks for missing dependencies or circular dependencies at application startup,
preventing common mistakes and ensuring a reliable initialization sequence.
Built-in Logger: The library includes a built-in logging mechanism, giving insights
into the application's initialization process and any potential issues.

#### How fx Simplifies DI in Go, Especially for Larger Applications:

**Automated Dependency Wiring**: In large applications with numerous dependencies, manually managing and injecting each dependency can become cumbersome. fx automatically wires together components based on the types they require and produce.

**Reduced Boilerplate**: With fx, you often just need to define constructors for your services and let the framework handle the rest. This minimizes repetitive code and streamlines the DI process.

**Scalability**: As your application grows, the dependency graph can become increasingly complex. fx scales well with the application's size, allowing you to add new dependencies or change existing ones with minimal friction.

**Elegant Handling of Application Lifecycles**: Large applications might have services or resources that need to be started or stopped in a specific order. fx provides lifecycle management features that allow you to define start and stop hooks, ensuring that resources are managed correctly throughout the application's lifespan.

#### Disadvantages

Like any framework or library, fx is not without its trade-offs. Some disadvantages
or concerns associated with using the fx library for Dependency Injection in Go include:

- **Learning Curve**: While fx simplifies many tasks, newcomers to Go or Dependency Injection might find it overwhelming initially. It introduces several concepts and idioms that developers must grasp to use the library effectively.
- **Debugging Complexity**: When DI is managed automatically, it can sometimes be challenging to trace and debug issues related to dependency initialization or injection, especially if there's a misconfiguration.
- **Less Explicit Control**: Manual DI gives developers granular control over how and when dependencies are created and wired together. With fx, some of this control is handed over to the framework, which might not always be ideal, especially in scenarios that require non-standard setups.
- **Potential Overhead**: For smaller applications that don't have complex dependency graphs, introducing fx might be overkill. The additional abstraction layer could lead to slight overhead in both runtime performance and cognitive load for developers.
- **Dependency on Third-party Library**: Using fx means adding an external dependency to your project. This comes with the usual concerns like keeping up with updates, potential breaking changes in future versions, or the library becoming deprecated or less maintained over time.
- **Less "Go-idiomatic" for Some**: Some developers feel that explicit dependency management is more in line with Go's philosophy of simplicity and clarity. Introducing an automatic DI framework can feel like a departure from this.
- **Interoperability with Other Libraries**: There's a chance that fx might not play well with certain Go libraries or tools out of the box, requiring additional effort or workarounds to make them compatible.
- **Increased Startup Time**: Automatically constructing a dependency graph and validating it can introduce additional startup time, especially for applications with a large number of dependencies.

# 4. Hands-on: Using fx for DI in Go

In this example, the PrintSomething function consumes the logger created by the NewLogger
constructor. When the application starts, it first creates the logger and then calls
the PrintSomething function with the constructed logger as its argument.

```go
package main

import (
	"log"
	"os"
	"go.uber.org/fx"
)

// Logger Constructor
func NewLogger() (*log.Logger, error) {
	return log.New(os.Stdout, "fx-example: ", log.LstdFlags), nil
}

// Function that consumes the logger
func PrintSomething(logger *log.Logger) {
	logger.Println("Hello, fx!")
}

func main() {
	app := fx.New(
		fx.Provide(NewLogger),       // Register the constructor
		fx.Invoke(PrintSomething),   // Consume the logger
	)

	// Run the app
	app.Run()
}
```


```bash
go get go.uber.org/fx
go run main.go
```

And below a real world example of fx

```go
func Opts() []fx.Option {
	return []fx.Option{
		config.Module,
		telemetry.Module,
		fx.Provide(
			fx.Annotate(bidder.NewServer, fx.As(new(pv3.BidderServer))),
			bidder.NewArtifactsGroupManager,
			fx.Annotate(
				download.NewS3Downloader,
				fx.As(new(download.Downloader)),
			),
			fx.Annotate(bidderTFS.NewGrpcClient, fx.As(new(bidderTFS.BidderTFSClient))),
			grpcd.NewGRPCServer,
			httpd.NewHTTPServer,
			httpd.NewRouter,
			NewMetrics,
			NewS3,
			session.NewSession,
		),
		fx.Invoke(grpckit.NewCodec, Start),
		fx.WithLogger(telemetry.FxEventLogger),
	}
}
```


##### 5. DI Framework vs. Go Design Philosophy

Go's design philosophy emphasizes simplicity, clarity, and the principle of least
surprise. Many of Go's guidelines revolve around directness and readability of code.
When one reads a Go program, it should be abundantly clear what the code is doing,
without magic or hidden behaviors.

Dependency Injection (DI) frameworks, like fx, often introduce automation and "magic"
that can obscure what's happening behind the scenes. This can, at times, be contrary
to Go's philosophy. The use of reflection or generating code behind the scenes (which
many DI frameworks employ) can make it harder for a developer to follow the flow
and understand dependencies just by reading the code. This can introduce additional
cognitive overhead and debugging complexity.

##### The Merits of DI as a Concept

Despite the concerns surrounding DI frameworks, Dependency Injection as a concept
is fundamentally about decoupling, making components more modular, testable, and
maintainable.

**Decoupling**: DI helps in reducing the tight coupling between software components. When components are loosely coupled, they can be reused, refactored, or replaced with minimal effort.
**Testability**: By allowing dependencies to be injected, it becomes far simpler to insert mock objects for testing. This means unit tests can focus on the component's logic rather than its dependencies.
**Maintainability**: As applications grow, having a structured way to manage dependencies can make the codebase easier to understand and modify.

These merits make DI an attractive design pattern, even in the Go community.

##### Interface-based DI in Go

While DI frameworks may not be idiomatic in Go, the language provides first-class
support for interfaces, which are often used for a form of manual dependency injection.

Interface-based DI is a common and idiomatic way to achieve dependency decoupling
in Go. By designing components to depend on interfaces (rather than concrete implementations),
it becomes trivial to swap out actual implementations, be it for testing or to introduce
a new behavior. This aligns with the Go proverb: "Accept interfaces, return structs."

For instance, instead of a component explicitly asking for a MySQL database connection,
it might ask for an interface that provides certain database operations. This way,
the component is decoupled from MySQL and could easily work with PostgreSQL, an in-memory
database, or a mock database during testing, as long as they implement the required
interface.

# 6. Conclusion

While DI frameworks might not align perfectly with Go's design philosophy, DI as
a principle offers significant advantages and is embraced in the Go ecosystem through
interface-based design. The key is to leverage the strengths of Go's static typing
and interfaces to achieve modularity and testability without introducing unnecessary
complexity. In this way, developers can adhere to Go's design principles while also
benefiting from the advantages that DI brings to software design.
