import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default async function Participants({ students }: { students: any[] }) {
  return <DataTable columns={columns} data={students} />;
}
