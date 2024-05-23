import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity({ name: "SearchTerm" })
export class SearchTerm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  keyword: string;

  @Column({ nullable: false })
  lastSearch: string;

  @OneToMany(() => Movie, (movie) => movie.search_term)
  movies: Movie[];
}
