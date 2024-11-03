import type { Dayjs } from "dayjs";

export interface ResponseTest{
  test_id: string,
  test_subject: string,
  disease: string,
  test_result: string,
  test_center: string
  test_date: string
}

export interface ResponseSubjectTest{
  test_id: string,
  disease: string,
  result: string,
  test_center: string,
  test_date: string,
}

export interface ResponseSubject{
  id: string,
  name: string,
  email: string,
  created_at: string,
  tests: ResponseSubjectTest[]
}

export interface ResponseSubjectFilterVariables{
  id: string,
  name: string,
}

export interface ResponseOverview{
  num_subjects: number,
  num_tests: number,
  num_diseases: number,
  num_users: number
}

export const enum Resource {
  Subject = "subjects",
  Test = "tests",
}

