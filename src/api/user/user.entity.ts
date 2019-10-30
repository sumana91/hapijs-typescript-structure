import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity({
	name: 'user'
})

export class User extends BaseEntity {

	@Column({ name: 'first_name', length: 100, nullable: true })
	first_name: string;

	@Column({ name: 'middle_name', length: 100, nullable: true })
	middle_name: string;

	@Column({ name: 'last_name', length: 100, nullable: true })
	last_name: string;

	@Column({ name: 'email', length: 100, nullable: false })
	email: string;

	@Column({ name: 'pool_id', length: 100, nullable: false })
	pool_id: string;

	@Column({ name: 'role', length: 100, nullable: true })
	role: string;

	@Column({ name: 'cognito_user_id', length: 200, nullable: true })
	cognito_user_id: string;
}
