"use client";

import { useState, useEffect, useCallback } from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Select,
  SelectSection,
  SelectItem,
  TableCell,
  Tooltip,
  getKeyValue,
  User as NextUIUser,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Snippet,
} from "@nextui-org/react";
import { User } from "@/auth";
import { TrashIcon } from "@heroicons/react/16/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const columns = [
  { uid: "profile", name: "Profile" },
  { uid: "user-id", name: "User ID" },
  { uid: "discord-id", name: "Discord ID" },
  { uid: "account-type", name: "Account Type" },
  { uid: "actions", name: "Actions" },
];

export default function AdminEventsPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  function updateUser(user: User) {
    fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  }

  function deleteUser(user: User) {
    fetch(`/api/users/${user.id}`, { method: "DELETE" }).then((res) =>
      res.json(),
    );
  }

  const renderCell = useCallback((user: User, column: string) => {
    switch (column) {
      case "profile":
        return (
          <NextUIUser
            avatarProps={
              user.image ? { isBordered: true, src: user.image } : undefined
            }
            name={user.name}
          />
        );
      case "user-id":
        return user.id;
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
                updateUser({ ...user, isAnonymous: true, isAdmin: false });
              } else if (value === "user") {
                updateUser({ ...user, isAnonymous: false, isAdmin: false });
              } else if (value === "admin") {
                updateUser({ ...user, isAnonymous: false, isAdmin: true });
              }
            }}
          >
            <SelectItem key="anonymous" value="Anonymous">
              Anonymous
            </SelectItem>
            <SelectItem key="user" value="User">
              User
            </SelectItem>
            <SelectItem key="admin" value="Admin">
              Admin
            </SelectItem>
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
                onClick={() => deleteUser(user)}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Card isBlurred>
      <CardHeader className="justify-between">
        <h2 className="text-3xl font-bold">Users</h2>
      </CardHeader>

      <CardBody className="flex flex-col gap-4">
        {/* {users.map((user) => (
          <Card key={user.id} isBlurred>
            <CardBody className="flex gap-4">
              <NextUIUser
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
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(user) => (
              <TableRow key={user.id}>
                {(key) => (
                  <TableCell>{renderCell(user, key as string)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
