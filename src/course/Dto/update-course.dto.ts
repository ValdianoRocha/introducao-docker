import { PartialType } from "@nestjs/swagger";
import { courseDto } from "./create-course.dto";


export class UpdateCourseDto extends PartialType(courseDto) { }