import {
  Processor,
  Process,
  OnQueueDrained,
  OnQueueCompleted,
} from '@nestjs/bull'
import { Job } from 'bull'

@Processor('balance')
export class AudioConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0
    for (let i = 0; i < 100; i++) {
      await this.doSomething(job.data)
      progress += 1
      await job.progress(progress)
    }
    return {}
  }

  async doSomething(_payload: unknown) {
    // TODO: Code here
  }

  @OnQueueCompleted()
  async handleJobCompleted(_job: Job<unknown>, _result: any) {
    // TODO: Code here
  }

  @OnQueueDrained()
  async handleQueueDrained() {
    // TODO: Code here
  }
}
