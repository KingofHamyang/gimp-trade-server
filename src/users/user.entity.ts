import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 6, scale: 3, nullable: true })
  buy_target_gimp: number;

  @Column('decimal', { precision: 6, scale: 3, nullable: true })
  sell_target_gimp: number;

  @Column('decimal', { precision: 9, scale: 0, nullable: true })
  krw_trade_amount: number;

  @Column('decimal', { precision: 9, scale: 0, nullable: true })
  btc_trade_amount: number;

  @Column()
  state: string;
}
