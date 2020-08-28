import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TradeLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  datetime: Date;

  //start: 1 // end: 0
  @Column()
  type: number;

  @Column('decimal', { precision: 9, scale: 0, nullable: true })
  krw_trade_amount: number;

  @Column('decimal', { precision: 9, scale: 0, nullable: true })
  btc_trade_amount: number;

  @Column('decimal', { precision: 7, scale: 1, nullable: true })
  usd_trade_amount: number;
}
