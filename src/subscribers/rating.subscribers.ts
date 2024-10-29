// src/subscribers/rating.subscriber.ts
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  getRepository,
} from "typeorm";
import { Coach } from "../entities/coach.entity";
import { Content } from "../entities/content.entity";
import { Session } from "../entities/session.entity";
import { CoachRating } from "../entities/coach-rating.entity";
import { ContentRating } from "../entities/content-rating.entity";
import { SessionReview } from "../entities/session-review.entity";

@EventSubscriber()
export class RatingSubscriber
  implements
    EntitySubscriberInterface<CoachRating | ContentRating | SessionReview>
{
  async afterInsert(
    event: InsertEvent<CoachRating | ContentRating | SessionReview>,
  ) {
    await this.updateRatings(event.entity);
  }

  async afterUpdate(
    event: UpdateEvent<CoachRating | ContentRating | SessionReview>,
  ) {
    await this.updateRatings(event.entity as any);
  }

  async afterRemove(
    event: RemoveEvent<CoachRating | ContentRating | SessionReview>,
  ) {
    //  Utilisez l'entity target de l'événement RemoveEvent pour récupérer l'entité supprimée
    await this.updateRatings(event.databaseEntity);
  }

  private async updateRatings(
    entity: CoachRating | ContentRating | SessionReview,
  ) {
    if (entity instanceof CoachRating) {
      const coachRepository = getRepository(Coach);
      const coach = await coachRepository.findOne({
        where: { id: entity.coach.id },
        relations: ["ratings"],
      });

      if (coach) {
        const ratings = coach.ratings;
        coach.ratingAvg = this.calculateAverageRating(ratings);
        // coach.numberOfRatings = ratings.length;
        await coachRepository.save(coach);
      }
    } else if (entity instanceof ContentRating) {
      const contentRepository = getRepository(Content);
      const content = await contentRepository.findOne({
        where: { id: entity.content.id },
        relations: ["ratings"],
      });

      if (content) {
        const ratings = content.ratings;
        content.averageRating = this.calculateAverageRating(ratings);
        content.numberOfRatings = ratings.length;

        await contentRepository.save(content);
      }
    } else if (entity instanceof SessionReview) {
      const sessionRepository = getRepository(Session);
      const contentRepository = getRepository(Content);
      const session = await sessionRepository.findOne({
        where: { id: entity.session.id },
        relations: ["sessionReviews", "content"],
      });
      const content = await contentRepository.findOne({
        where: { id: session.content.id },
        relations: ["sessionReviews", "content"],
      });

      if (content) {
        const reviews = session.sessionReviews;
        content.averageRating = this.calculateAverageRating(reviews);
        content.numberOfRatings = reviews.length;
        await contentRepository.save(session);
      }
    }
  }

  private calculateAverageRating(
    ratings: (CoachRating | ContentRating | SessionReview)[],
  ): number {
    if (ratings.length === 0) {
      return 0;
    }

    const sumOfRatings = ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0,
    );
    return sumOfRatings / ratings.length;
  }
}
