import { EventEmitter } from "events";

class FrameCommentDetector extends EventEmitter {
  quietThreshold: number;
  middleThreshold: number;
  interval: number;
  frameDuration: number;
  responses: number[];
  currentState: string;
  monitorInterval: NodeJS.Timeout | null;

  constructor(
    quietThreshold: number,
    middleThreshold: number,
    interval: number,
    frameDuration: number
  ) {
    super();
    this.quietThreshold = quietThreshold;
    this.middleThreshold = middleThreshold;
    this.interval = interval;
    this.frameDuration = frameDuration;
    this.responses = [];
    this.currentState = "quiet";
    this.monitorInterval = null;
  }

  addComment() {
    const now = Date.now();
    this.responses.push(now);
    this.changeState("active");
    this.resetMonitorInterval();
  }

  changeState(newState: string) {
    this.emit("stateChange", newState);
    this.currentState = newState;
  }

  resetMonitorInterval() {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }
    this.monitorInterval = setInterval(() => {
      const commentCount = this.responses.length;
      if (commentCount <= this.quietThreshold) {
        this.changeState("quiet");
      } else {
        this.changeState("active");
      }
      this.responses = [];
    }, this.frameDuration);
  }

  monitor() {
    this.resetMonitorInterval();
  }
}

export { FrameCommentDetector };
