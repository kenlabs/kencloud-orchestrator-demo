package main

import (
	"PubSubScheduler/schedule"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/execute", func(c *gin.Context) {
		client := c.Query("client")
		if client == "" {
			c.JSON(400, gin.H{
				"message": "nil client info",
			})
			return
		}

		executorServer, err := schedule.ScheduleExecutorServer(client)
		if err != nil {
			c.JSON(409, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"message": executorServer,
		})
	})

	r.Run(":8769") //
}
