import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class BaseEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ name: 'created_date', nullable: true, default: () => `now()` })
	created_date: Date;

	@Column({ name: 'created_by', nullable: true, default: null })
	created_by: string;

	@Column({ name: 'modified_date', nullable: true, default: null })
	modified_date: Date;

	@Column({ name: 'modified_by', nullable: true, default: null })
	modified_by: string;

	@Column({ name: 'status', nullable: false, default: 'ACTIVE' })
	status: string;
}
