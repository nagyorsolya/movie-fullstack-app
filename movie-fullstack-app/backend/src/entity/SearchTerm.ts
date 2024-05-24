import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity({ name: "SearchTerm" })
export class SearchTerm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  keyword: string;

  @Column({ type: "timestamp" })
  lastSearch: Date;

  @OneToMany(() => Movie, (movie) => movie.search_term)
  movies: Movie[];

  @Column({ nullable: false, default: 0 })
  cacheHitCount: number;

  @Column({ nullable: false, default: 1 })
  total_pages: number;
}
