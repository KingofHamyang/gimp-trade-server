import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Margin {
  @PrimaryColumn()
  datetime: Date;

  @Column("decimal", { precision: 5, scale: 2 })
  upbit_price: number;

  @Column("decimal", { precision: 5, scale: 2 })
  bitmex_price: number;

  @Column("decimal", { precision: 5, scale: 2 })
  rate: number;
}