import {
  Processor,
  Process,
  OnQueueDrained,
  OnQueueCompleted
} from '@nestjs/bull'
import { Job } from 'bull'

@Processor('balance')
export class AudioConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      await this.doSomething(job.data)
      progress += 1;
      await job.progress(progress)
    }
    return {};
  }

  async doSomething(payload: unknown) {}

  @OnQueueCompleted()
  async handleJobCompleted(job: Job<unknown>, result: any) {}

  @OnQueueDrained()
  async handleQueueDrained() {}
}
