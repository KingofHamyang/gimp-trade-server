import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Gimp {
  @PrimaryColumn({ type: 'timestamptz' })
  datetime: Date;

  @Column('decimal', { precision: 9, scale: 0, nullable: true})
  upbit_price: number;

  @Column('decimal', { precision: 7, scale: 1, nullable: true})
  bitmex_price: number;

  @Column('decimal', { precision: 6, scale: 3, nullable: true})
  fixed_gimp: number;

  @Column('decimal', { precision: 6, scale: 3, nullable: true})
  gimp: number;

  @Column('decimal', { precision: 9, scale: 0, nullable: true })
  usdkrw_rate: number;
}
