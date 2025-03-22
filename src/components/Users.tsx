"use client"

import { useEffect, useState } from "react"
import { Table, Avatar, Button, Spinner, Card, Breadcrumb } from "flowbite-react"
import { HiHome } from "react-icons/hi"
import UserService from "../services/userService"
import type { User } from "../models/User"
import { getTranslation, getStoredLanguage, type Language } from "../i18n/index"

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    setLanguage(getStoredLanguage())

    setLoading(true)
    UserService.getUsers()
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
        setLoading(false)
      })
  }, [])

  const t = (key: string) => getTranslation(language, key)

  return (
    <div className="p-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          {t("breadcrumb.home") || "Home"}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {t("breadcrumb.users") || "Users"}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("users.title")}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {t("users.description") || "Manage your users and their permissions"}
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = '/users/new')}
            size="xs"
            className="rounded-full bg-green-600 hover:bg-green-700 text-white p-2 w-8 h-8 flex items-center justify-center"
            title={t("users.actions.add") || "Add User"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="sr-only">{t("users.actions.add") || "Add User"}</span>
          </Button>
        </div>

        <div className="overflow-x-auto shadow-sm rounded-lg">
          <Table striped hoverable className="w-full">
            <Table.Head className="bg-gray-50 dark:bg-gray-700">
              <Table.HeadCell className="px-6 py-3 text-center">{t("users.table.avatar")}</Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-center">{t("users.table.name")}</Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-center">{t("users.table.email")}</Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-center">{t("users.table.phone")}</Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-center">{t("users.table.active")}</Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-center">{t("users.table.admin")}</Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-center">{t("users.table.actions")}</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {loading ? (
                <Table.Row className="bg-white dark:bg-gray-800">
                  <Table.Cell colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex justify-center items-center">
                      <Spinner size="xl" />
                      <span className="ml-2 text-gray-500 dark:text-gray-400">
                        {t("users.loading") || "Loading users..."}
                      </span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : users && users.length > 0 ? (
                users.map((user) => (
                  <Table.Row
                    key={user.id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Table.Cell className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Avatar
                          img={user.avatarUrl || `/avatars/avatar${user.id}.jpg`}
                          rounded
                          size="md"
                          placeholderInitials={`${user.firstName[0]}${user.lastName[0]}`}
                          className="ring-2 ring-gray-100 dark:ring-gray-600 w-12 h-12"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">ID: {user.id}</div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-left">
                      <div className="text-sm text-gray-500 dark:text-gray-300 font-medium">{user.email}</div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-300">{user.phone || "—"}</div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={user.isActive}
                          disabled
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">Active status</label>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={user.isAdmin}
                          disabled
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">Admin status</label>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-3">
                        <Button
                          onClick={() => (window.location.href = `/users/${user.id}`)}
                          size="sm"
                          className="font-medium px-3 py-2 bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {t("users.table.edit")}
                        </Button>
                        <Button
                          onClick={() => {
                            /* Aquí irá la lógica de borrado */
                          }}
                          size="sm"
                          className="font-medium px-3 py-2 bg-red-600 hover:bg-red-700 text-white"
                        >
                          {t("users.table.delete")}
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row className="bg-white dark:bg-gray-800">
                  <Table.Cell colSpan={7} className="px-6 py-16 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {t("users.empty") || "No hay usuarios para mostrar"}
                    </p>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  )
}


