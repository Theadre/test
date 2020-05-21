import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, PrimaryColumn, ManyToMany, OneToOne } from 'typeorm';

@Entity('Programme')
export class Programme {

    @PrimaryGeneratedColumn()
    id = null;
    
    @Column('text')
    title = '';

    @Column('date')
    date = new Date();

    @ManyToMany(_type => Course, va => va.programmes, { onDelete: 'CASCADE' })
    courses: Course[];

    @OneToMany(_type => StudentProgramme, va => va.programme, { onDelete: 'CASCADE' })
    studentProgrammes: StudentProgramme[];
}

@Entity('StudentProgramme')
export class StudentProgramme {

    @PrimaryColumn('integer')
    studentId = null;

    @PrimaryColumn('integer')
    programmeId = null;

    @Column('date')
    date = new Date();

    @ManyToOne(_type => Student, a => a.studentProgrammes, { onDelete: 'CASCADE' })
    student: Student;

    @ManyToOne(_type => Programme, a => a.studentProgrammes, { onDelete: 'CASCADE' })
    programme: Programme;
}

@Entity('Student')
export class Student {

    @PrimaryGeneratedColumn()
    id = null;

    @Column('date')
    date = new Date();

    @Column('text')
    firstName = '';

    @Column('text')
    lastName = '';

    @Column('text')
    degree = '';

    @OneToMany(_type => StudentProgramme, va => va.student, { onDelete: 'CASCADE' })
    studentProgrammes: StudentProgramme;
}

@Entity('Course')
export class Course {

    @PrimaryGeneratedColumn()
    id = null;

    @Column('date')
    date = new Date();

    @Column('text')
    courseCode = '';

    @Column('text')
    title = '';

    @Column('text')
    prerequisites: string[];

    @Column('text')
    restrictions: string[];

    @Column('boolean')
    semester: { first: boolean; second: boolean };

    @Column('boolean')
    valueArea: { one:boolean;  two:boolean; three:boolean; four:boolean };

    @Column('text')
    description = '';

    @ManyToMany(_type => Programme, va => va.courses, { onDelete: 'CASCADE' })
    programmes: Programme[];

    @OneToOne(_type => CourseCode, va => va.course, { onDelete: 'CASCADE' })
    courseCodes: CourseCode[];
}

@Entity('CourseCode')
export class CourseCode {

    @PrimaryGeneratedColumn()
    id = null;

    @Column('text')
    title = '';

    @Column('number')
    code = null;

    @Column('integer')
    courseId = 0;

    @Column('date')
    date = new Date();

    @OneToOne(_type => Course, va => va.courseCodes, { onDelete: 'CASCADE' })
    course: Course;
}