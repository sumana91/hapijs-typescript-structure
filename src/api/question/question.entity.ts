import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../common/base/base.entity";

@Entity({
  name: 'question'
})

export class Question extends BaseEntity {

  @Column({ name: 'text', length: 255, nullable: false })
  text: string;

}
