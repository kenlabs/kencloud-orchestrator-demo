# kencloud-orchestrator-demo


# Scheduler
用于就近调度计算节点，并告知客户端该节点的PubSub通道，用于发送任务消息和接收结果

# Executor
计算节点，从PubSub中接收任务消息，在Docker:lambda中计算并将结果输出在PubSub中

# Client
客户端
