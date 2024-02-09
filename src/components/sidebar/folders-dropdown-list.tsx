"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { Folder } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { v4 } from "uuid";
import { useToast } from "../ui/use-toast";

interface FoldersDropdownListProps {
  workspaceFolders: Folder[];
  workspaceId: string;
}

const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  const { state, dispatch, folderId } = useAppState();
  const { toast } = useToast();
  const [folders, setFolders] = useState(workspaceFolders);
  const { subscription } = useSupabaseUser();

  //effec set nitial satte server app state
  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
  }, [workspaceFolders, workspaceId, dispatch, state]);
  //state

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
  }, [state, workspaceId]);

  //add folder

  return (
    <>
      <div className="sticky z-20 top-0 bg-background w-full h-10 group/title justify-between items-center pr-4 text-Neutrals-8/neutrals-8">
        <span className="text-Neutrals-8 font-bold text-xs">FOLDERS</span>
      </div>
    </>
  );
};

export default FoldersDropdownList;
