import { UpdateUserForm } from "@/components/form/update-user";
import React from "react";

interface Props {
  params: { id: string };
}

function UpdateId({ params }: Props) {
  return (
    <section className="flex">
      <UpdateUserForm id={params.id} />
    </section>
  );
}

export default UpdateId;
