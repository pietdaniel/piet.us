Gameday Guide
===
2023-09-15

# Intro

This document provides a comprehensive guide to running gamedays. It includes an overview of the importance of gamedays, a step-by-step guide to running a successful gameday, and a list of important failure scenarios to test during the gameday. 
# Importance of Gamedays
Gamedays are an essential practice for software engineering teams to improve their systems' reliability, scalability, and resilience. They simulate real-life scenarios where the system is under heavy load, experiencing failures, or recovering from disasters. Gamedays provide an opportunity for teams to identify weaknesses in the system and work together to improve them before they become critical issues.

Gamedays also help teams build confidence in their ability to handle complex situations, improve their communication and collaboration skills, and validate their disaster recovery procedures. By identifying and resolving issues during a gameday, teams can reduce downtime, improve user experience, and increase overall system availability.
# How to Run a Gameday
## Step 1: Define Objectives
The first step in running a gameday is to define its objectives. Objectives should be specific, measurable, achievable, relevant, and time-bound (SMART). They should be aligned with the team's goals and Rokt's mission.

Example objectives for a gameday could include:

- Validate the system's ability to handle a sudden spike in traffic
- Test the system's auto-scaling capabilities
- Verify the system's resilience to infrastructure failures
- Ensure that the system's disaster recovery procedures are working correctly
## Step 2: Plan and Prepare
The second step is to plan and prepare for the gameday. This involves defining the scenarios to be tested, preparing the infrastructure, and selecting the tools and metrics to be used.

Example scenarios for a gameday on microservices in the cloud on Kubernetes could include:

- A sudden surge in traffic due to a campaign
- A network failure that isolates one or more microservices
- A Kubernetes node failure
- A database failure that requires failover to a secondary replica

To prepare for the gameday, the team should set up the necessary infrastructure, including Kubernetes controllers, load generators, and observability tools. They should also define the metrics to be used to measure the system's performance and set up Datadog alerts to notify the team in case of critical issues.
## Step 3: Execute the Gameday
The third step is to execute the gameday. This involves running the defined scenarios, monitoring the system's performance, and recording the results.

During the gameday, the team should work together to identify and resolve issues as they arise. They should use the metrics and alerts defined in the previous step to track the system's performance and detect anomalies. They should also communicate effectively to ensure that everyone is aware of the current status of the system and the actions being taken.

Gamedays can take a while, be sure to set aside an appropriate amount of time to execute the gameday (2-3 hours).
## Step 4: Evaluate and Improve
The final step is to evaluate the gameday's results and identify areas for improvement. This includes analyzing the metrics collected during the gameday, reviewing the team's performance, and identifying opportunities for process and infrastructure improvements.

The team should document the lessons learned and use them to improve their disaster recovery procedures, scalability, and resilience. They should also schedule regular gamedays to continue testing the system and improving their skills.
# Important Failure Scenarios to Test During Gamedays
During a gameday, it is crucial to test a variety of failure scenarios to ensure that the system is resilient to different types of failures. Here are some important failure scenarios to test during a gameday.
## 1. Network Failure
One of the most common causes of failure is network failure. Testing network failures during a gameday can help identify how well the system handles such failures and how quickly it recovers.

Some network failure scenarios to test during a gameday include:

- Network latency or congestion that slows down communication between microservices.
- Network partition that isolates one or more microservices from the rest of the system.
- DNS resolution failure that prevents microservices from communicating with each other.
## 2. Node Failure
In a Kubernetes cluster, nodes can fail due to various reasons such as hardware failure, software bugs, or network issues. Testing node failures during a gameday can help identify how well the system handles such failures and how quickly it recovers.

Some node failure scenarios to test during a gameday include:

- Node outage that causes a pod to become unschedulable.
- Node drain that evicts pods from a node due to maintenance or scaling down.
- Node reboot that causes all pods on the node to be rescheduled.
## 3. Application Failure
Microservices can fail due to various reasons such as programming errors, resource exhaustion, or dependencies issues. Testing application failures during a gameday can help identify how well the system handles such failures and how quickly it recovers.

Some application failure scenarios to test during a gameday include:

- Memory or CPU exhaustion that causes a pod to crash or become unresponsive.
- A programming error that causes a microservice to enter an infinite loop or deadlock.
- Dependency issues that cause a microservice to fail to communicate with other microservices.
## 4. Infrastructure Failure
The underlying infrastructure on which the system runs can also fail due to various reasons such as power outage, hardware failure, or natural disasters. Testing infrastructure failures during a gameday can help identify how well the system handles such failures and how quickly it recovers.

Some infrastructure failure scenarios to test during a gameday include:

- Cloud provider outage that causes a cluster or a node to become unavailable
- Disk failure that causes data loss or corruption
- Natural disaster that affects the availability of an availability zone or data center
## 5. Disaster Recovery
Disaster recovery is the process of recovering the system to a functional state after a catastrophic failure. Testing disaster recovery procedures during a gameday can help identify how well the system handles such scenarios and how quickly it recovers.

Some disaster recovery scenarios to test during a gameday include:

- Backup and restore of data from a remote location
- Failover to a secondary data center in case of a disaster
- Recovery from a complete system failure

By testing these and other failure scenarios during gamedays, teams can ensure that their deployments are resilient, scalable, and reliable. They can identify weaknesses in the system and work together to improve them, resulting in better system performance, increased availability, and improved user experience.
# Gameday Scenario Template

Below is an example template for a given scenario. It should include a description of the scenario, the commands to be run to enact the scenario, the expected result of the scenario, the actual result of the scenario, and action items to take away.
### Scenario 1: It fires an alert when the CPU is above 80%
#### Command

```bash
# get the pods
POD_NAME="$(kubectl get po -n campaign-store)"
# exec into pod
kubectl exec $POD_NAME
# pin the CPU via yes bomb
yes > /dev/null &
```

#### Expectation

This monitor fires after 5 minutes of elevated CPU activity

#### Result ✅ | ❌

 - TODO

#### Action Items
 - TODO
