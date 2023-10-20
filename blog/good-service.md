Good Service Guide
===

*2023-10-20*

# Intro

I'd like to discuss my criteria for measuring the quality of service. This is by no means
a complete guide, nor all my thoughts on the topic, but just a starting point.

Within any engineering organization, It's imperative that services are easy to “grok”
at glance for any onlooker. In the event of an incident, an investigation, or even
regular scheduled work, being able to understand what a service does, where it fits
in the larger ecosystems, its characteristics, and owners is of great importance
to the agility of an engineering organization. Moreover, ensuring the service's
production behavior is known and monitored, along with being well tested and easily
deployable will preserve velocity. Not all, if any, services will
hit the 100% mark. If anything, doing so may hinder forward progress. The goal is
to provide aspirations for improvement and ensure that the ecosystem is well
oiled, easily traversable, and intelligible to a global audience.

# Documentation

> *"a comment is a lie waiting to happen"*
>
> -- *Josh Susser*

The first step to ensuring a quality service is documentation. As companies grow globally,
it is not always feasible to ask the service owner what a service does. Moreover,
a service may be abandoned over time or involved in off hour incidents to the service
owner. In these cases, clear and thorough documentation is invaluable to any stakeholder.
Below is a set of criteria which each service should aspire to hit.

At a minimum, every service should have the following

Have a README which:
 -  Describes what the service does
 -  Define the service’s responsibilities
 -  List the resident experts on the service

The next metric of quality is to include:

 -  How to build the service
 -  How to run the service locally
 -  How to deploy the service
 -  How to test the service
 -  The service’s dependencies

The final tier of documentation for a service:

 -  Describe development practices
 -  List relevant docs, runbooks, gamedays, and RFCs for the service
 -  If applicable list API Doc (Swagger / OpenAPI) locations
 -  Common issues and errors and how to resolve them
 -  Other operational commands relevant to the service

# Monitoring & Observability

> *“Can you understand what’s happening inside your system, just by asking questions from the outside?”*
>
>  -- Charity Majors

As the complexity of systems increases it is critical that we can understand
how they perform and behave in production. Observability is not just the measurement
of the ‘system level’ characteristics of an individual service (CPU, RAM, IO) but
more importantly the health of user experiences. To supplant documentation, having
good telemetry is another great way to understand at a glance the characteristics
of a system.

 -  Are the metrics easy to find? Is there a single canonical dashboard
 -  Does the service log, are the logs intelligible and easily navigated?
 -  Is the service incorporated into distributed tracing?
 -  Are the traces fully distributed, or just intra service?
 -  Does the service have monitors?
 -  Are the monitors tagged by team?
 -  Are there false negatives or false positives among the monitors?
 -  Are the metrics tagged with relevant information?
 -  Is it easy to determine which revision is running on production?
 -  Is it easy to determine when the last deployment was?
 -  Does the service have a defined runbook?
 -  Does the monitor template have links to dashboard/logs/run books?

# Development Ecosystem

> *“Tools amplify your talent. The better your tools, and the better you know how to use them, the more productive you can be.”*
>
> -- Andrew Hunt

Development ecosystems can make or break the velocity of an engineering team. The
fastest way to improve velocity is to lower the developers feedback cycles and improve
the time it takes to validate changes. If a developer is waiting an hour to release
a change to 'stage' just to click test it and find a bug; then change velocity will
be low. Having tools like local testing and linters can lower this feedback cycle.
Moreover, long CI times and deployment times will not only stifle feature development,
but can increase mean time to recovery during incidents.

 -  Is there a guide for setting up the service for local development?
 -  Can the developer run a single test locally?
 -  Can the developer run the entire test suite locally?
 -  Can the developer run the system locally?
 -  Are there linting / formatting tools locally or in CI?
 -  How long does the CI take to test and build the application?
 -  How long does it take to deploy a release to staging?
 -  Is the stage environment stable?
 -  Is the stage environment multi-tenant?
 -  Does the service have documentation on common operations?

# Testing

> *“Write tests until fear is transformed into boredom”*
>
> -- Kent Beck

Strong testing will build confidence in an application. Too much testing can slow development
and add friction to changes. Having a happy medium between the two can be difficult
but is necessary to ensure the stability of an application. Moreover, interfaces
which are easy to test are generally easy to work with. As systems become increasingly
complex, inter dependencies can be difficult to test in CI requiring alternative
methods. The testing pyramid should guide how we structure our tests.

 -  Are there tests?
 -  Are there unit tests?
 -  Are there integration tests within the service?
 -  Are there tests between the service and its dependencies?
 -  Are there E2E tests?
 -  Are there UI tests?
 -  Can the developer run tests locally?
 -  Are the tests run in CI?
 -  Are there available tools for load testing?
 -  Does the service have easily available code coverage tools?
 -  Is the service exercised regularly by synthetic tests?

# Deployment

> *“Release early. Release often. And listen to your customers.”*
>
> -- Eric S. Raymond

Deployments should not be a scary part of development. They should be easy, painless,
and easy to roll back. For services under active development, one could expect deploying
the systems 10s if not 100s a times a day. Deployments should be fast, automated,
and safe.

 -  How quickly can a developer deploy a branch to staging?
 -  How quickly can a developer deploy to prod?
 -  How quickly can a deployment be rolled back?
 -  Are deployment guides documented?
 -  Does the service utilize Blue Green deploys?
 -  Does the service utilize canary deploys?
 -  Does the deploy process have automatic rollback based on smoke tests?

# Code Quality

> *“Gofmt’s style is no one’s favorite, yet gofmt is everyone’s favorite.”*
>
> -- Rob Pike

Using one style consistently through a codebase lets us focus on other (more important)
issues. Consistency also allows for automation. More time will be spent reading code
than writing it; so it’s worth spending effort focusing on the readability of code.
The PR process is often the gatekeeper of code quality.

  - Does the service have linting?
  - Can a developer lint locally?
  - Is the linter run in CI?
  - Does the service have an auto formatter?
  - Can a developer integrate the formatter locally?
  - Is the formatter run in CI?
  - Does the service have an agreed upon style guide?
  - Does the service have a formal documented PR process?
  - Are developers prevented from pushing directly to master?
  - Are PR reviews required?
  - Does the service have CODEOWNERS?

# Conclusion

In today's engineering landscape, the quality of service is a a necessity. Services
should be transparent, easily comprehensible, and efficient in their operation. As
we've journeyed through the key facets of a quality service, from the indispensability
of thorough documentation to the assurance of a reliable development ecosystem, it
becomes clear that these are not just boxes to tick but crucial pillars for an engineering
organization's success. Monitoring and observability ensure the health and performance
of a service, while a robust testing environment guarantees its stability. Deployment
processes should be streamlined and fail-safe, and code quality must always uphold
the highest standards. Ultimately, the focus should always be on continuous improvement,
fostering an environment where best practices are not just implemented but also regularly
evolved. Remember, a well-oiled engineering ecosystem not only boosts velocity but
also ensures the delivery of exceptional value to its stakeholders. Let's strive
for excellence, not for perfection, and always keep the bigger picture in mind.

# More Reading

  - [ 12factor ](https://12factor.net/)
  - [ Google’s CPP Style Guide ](https://google.github.io/styleguide/cppguide.html)
  - [ Release Early, Release Often ](http://www.catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/ar01s04.html)
  - [ Zen of Python ](https://www.python.org/dev/peps/pep-0020/)
  - [ Go Proverbs ](https://go-proverbs.github.io/)
