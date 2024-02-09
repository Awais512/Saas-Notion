"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { workspace } from "@/lib/supabase/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface SelectedWorkspaceProps {
  workspace: workspace;
  onClick?: (option: workspace) => void;
}

const supabase = createClientComponentClient();

const SelectedWorkspace = ({ workspace, onClick }: SelectedWorkspaceProps) => {
  const [workspaceLogo, setWorkspaceLogo] = useState("/cypresslogo.svg");

  useEffect(() => {
    if (workspace.logo) {
      const path = supabase.storage
        .from("notion-bucket")
        .getPublicUrl(workspace.logo)?.data.publicUrl;
      setWorkspaceLogo(path);
    }
  }, [workspace]);

  return (
    <Link
      href={`/dashboard/${workspace.id}`}
      onClick={() => {
        if (onClick) onClick(workspace);
      }}
      className="flex rounded-md hover:bg-muted transition-all flex-row p-2 gap-4 justify-center cursor-pointer items-center my-2"
    >
      <Image
        src={workspaceLogo}
        alt="Workspace Logo"
        width={26}
        height={26}
        objectFit="cover"
      />
      <div className="flex flex-col">
        <p
          className="text-lg 
        w-[170px] 
        overflow-hidden 
        overflow-ellipsis 
        whitespace-nowrap"
        >
          {workspace.title}
        </p>
      </div>
    </Link>
  );
};

export default SelectedWorkspace;