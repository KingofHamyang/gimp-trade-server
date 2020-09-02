import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TradeLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  datetime: Date;

  @Column()
  type: string;

  @Column('decimal', { precision: 9, scale: 0, nullable: true })
  krw_trade_amount: number;

  @Column('decimal', { precision: 9, scale: 0, nullable: true })
  krw_trade_fee: number;

  @Column('decimal', { precision: 12, scale: 10, nullable: true })
  btc_trade_amount: number;

  @Column('decimal', { precision: 9, scale: 0, nullable: true })
  usd_trade_amount: number;

  @Column('decimal', { precision: 7, scale: 3, nullable: true })
  usd_trade_fee: number;
}
