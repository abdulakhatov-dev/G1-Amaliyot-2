import { Request, Response } from "express";

import { jobs } from "../../utils/jobs";
import { IJob } from "../../interfaces";
import { NotFoundHandler } from "../../helpers";
import { category } from "../../utils/category";

export const getAllJobs = (req: Request, res: Response) => {
  // const { type, search } = req.query;
  const type = req.query.type as string;
  const search = req.query.search as string;
  const limit = req.query.limit as string;

  let data = jobs;

  if (type) {
    data = jobs.filter((job: IJob) => job.type?.toLowerCase() === type);
  }

  if (search) {
    data = jobs.filter(
      (job: IJob) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  data = data.slice(0, limit ? parseInt(limit) : 10);

  res.status(200).json({
    success: true,
    message: "ok",
    data,
  });
};

export const getJobById = (req: Request, res: Response) => {
  const { jobId } = req.params;

  const foundJob = jobs.find((item: IJob) => item.id === jobId);

  if (!foundJob) {
    return NotFoundHandler(res, "Job");
  }

  res.status(200).json({
    success: true,
    message: "ok",
    data: foundJob,
  });
};

export const addJob = (req: Request, res: Response) => {
  const body = req.body;

  if (!category.includes(req.body.type.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: "Invalid job type",
    });
  }

  const newJob = {
    id: String(jobs.length + 1),
    title: body.title,
    type: body.type,
    location: body.location,
    description: body.description,
    salary: body.salary,
    company: {
      name: body.company.name,
      description: body.company.description,
      contactEmail: body.company.contactEmail,
      contactPhone: body.company.contactPhone,
    },
  };

  jobs.unshift(newJob);

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    data: newJob,
  });
};

export const editJob = (req: Request, res: Response) => {
  const jobId = req.params.jobId as string;
  const body = req.body;

  const index = jobs.findIndex((job: IJob) => job.id === jobId);

  if (index === -1) {
    return NotFoundHandler(res, "Job");
  }

  jobs[index] = {
    ...jobs[index],
    ...body,
  };

  res.status(200).json({
    success: true,
    message: "Job successfully updated",
    data: jobs[index],
  });
};

export const deleteJob = (req: Request, res: Response) => {
  const jobId = req.params.jobId as string;

  const index = jobs.findIndex((job: IJob) => job.id === jobId);

  if (index === -1) {
    return NotFoundHandler(res, "Job");
  }

  jobs.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Job successfully deleted",
  });
};
