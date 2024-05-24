import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SearchTerm } from "./SearchTerm";

@Entity({ name: "Movie" })
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  release_date: string;

  @Column({ nullable: true })
  poster_path: string;

  @ManyToOne(() => SearchTerm, (search_term) => search_term.movies)
  @JoinColumn({ name: "searchTermId" })
  search_term: SearchTerm;

  @Column({ nullable: false })
  searchTermId: number;
}
