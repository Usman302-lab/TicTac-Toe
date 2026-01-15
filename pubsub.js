class PubSub {
  constructor() {
    this.subscribers = {};
  }
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event] = this.subscribers[event].filter(
      (cb) => cb !== callback
    );
  }

  publish(event, data) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event].forEach((callback) => {
      callback(data);
    });
  }
}

const pubSub = new PubSub();

const unsubscribeNike = pubSub.subscribe("nikeAirForce",(data)=>{
    console.log("Received data for Nike Air Force:", data);
});

const unsubscribeAdidas = pubSub.subscribe("adidasUltraboost",(data)=>{
    console.log("Received data for Adidas Ultraboost:", data);
});

pubSub.publish("nikeAirForce", { size: 10, color: "white" });
pubSub.publish("adidasUltraboost", { size: 9, color: "black" });
unsubscribeAdidas();

export default pubSub;