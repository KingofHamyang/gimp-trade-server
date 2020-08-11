import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Margin {
  @PrimaryColumn()
  datetime: Date;

  @Column('decimal', { precision: 9, scale: 0 })
  upbit_price: number;

  @Column('decimal', { precision: 7, scale: 1 })
  bitmex_price: number;

  @Column('decimal', { precision: 6, scale: 3 })
  fixed_gimp: number;

  @Column('decimal', { precision: 6, scale: 3 })
  gimp: number;

  @Column('decimal', { precision: 6, scale: 3 })
  usdkrw_rate: number;
}
