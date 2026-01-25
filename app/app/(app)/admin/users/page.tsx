"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User as HeroUIUser,
  Link,
  Select,
  SelectItem,
  SelectSection,
  Snippet,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
} from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

const columns = [
  { name: "Profile", uid: "profile" },
  { name: "User ID", uid: "user-id" },
  { name: "GitHub ID", uid: "github-id" },
  { name: "Discord ID", uid: "discord-id" },
  { name: "Account Type", uid: "account-type" },
  { name: "Actions", uid: "actions" },
];

export default function AdminEventsPage() {
  const users = useQuery(api.users.getAllUsers);
  const patchUser = useMutation(api.users.patchUser);
  const deleteUser = useMutation(api.users.deleteUser);

  const renderCell = useCallback(
    (user: Doc<"users">, column: string) => {
      switch (column) {
        case "profile":
          return (
            <HeroUIUser
              avatarProps={user.image ? { isBordered: true, src: user.image } : undefined}
              name={user.name}
            />
          );
        case "user-id":
          return user._id;
        case "github-id":
          return user.githubId;
        case "discord-id":
          return user.discordId;
        case "account-type":
          return (
            <Select
              variant="bordered"
              defaultSelectedKeys={[
                user.isAnonymous ? "anonymous" : user.isAdmin ? "admin" : "user",
              ]}
              onSelectionChange={(values) => {
                const [value] = values;

                if (value === "anonymous") {
                  patchUser({
                    id: user._id,
                    user: { isAdmin: false, isAnonymous: true },
                  });
                } else if (value === "user") {
                  patchUser({
                    id: user._id,
                    user: { isAdmin: false, isAnonymous: false },
                  });
                } else if (value === "admin") {
                  patchUser({
                    id: user._id,
                    user: { isAdmin: true, isAnonymous: false },
                  });
                }
              }}
            >
              <SelectItem key="anonymous">Anonymous</SelectItem>
              <SelectItem key="user">User</SelectItem>
              <SelectItem key="admin">Admin</SelectItem>
            </Select>
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" isIconOnly>
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  key="delete"
                  color="danger"
                  startContent={<TrashIcon className="h-4 w-4" />}
                  onPress={() => deleteUser({ id: user._id })}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return null;
      }
    },
    [deleteUser, patchUser],
  );

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <Card isBlurred>
      <CardHeader className="justify-between">
        <h2 className="text-3xl font-bold">Users</h2>
      </CardHeader>

      <CardBody className="flex flex-col gap-4">
        {/* {users.map((user) => (
          <Card key={user.id} isBlurred>
            <CardBody className="flex gap-4">
              <HeroUIUser
                avatarProps={
                  user.image
                    ? {
                        isBordered: true,
                        src: user.image,
                      }
                    : undefined
                }
                className="h-auto justify-start p-2 transition-transform"
                description={user.email}
                name={user.name}
              />


            </CardBody>
          </Card>
        ))} */}

        <Table aria-label="Users table" isStriped selectionMode="none">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(user) => (
              <TableRow key={user._id}>
                {(key) => <TableCell>{renderCell(user, key as string)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
