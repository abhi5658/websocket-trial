# websocket-trial


### Normal user
- Connect to `localhost:8080`
- will get id 1 to 700

### Other user
- Connect to `localhost:8080?big_id=1`
- will get id 700 to 1000

### Condition
- all ids < 700 will receive new messsages
- anyone can send messages
