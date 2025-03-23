"use client"

import { useEffect, useState } from "react"
import { Table, Avatar, Button, Spinner, Card, Breadcrumb } from "flowbite-react"
import { HiTrash, HiHome } from "react-icons/hi"
import UserService from "../services/userService"
import type { User } from "../models/User"
import { getTranslation, getStoredLanguage, type Language } from "../i18n/index"

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<Language>(getStoredLanguage())

 useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await UserService.getUsers()
        console.log("Usuarios obtenidos:", response) // Debug
        setUsers(response)
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Debug para ver el estado
  console.log("Estado actual:", { users, loading })

  if (loading) {
    return <div className="p-4"><Spinner size="xl" /></div>
  }

  return (
    <div className="p-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          {getTranslation(language, "breadcrumb.home") || "Home"}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {getTranslation(language, "breadcrumb.users") || "Users"}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getTranslation(language, "users.title")}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {getTranslation(language, "users.description") || "Manage your users and their permissions"}
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = '/users/new')}
            size="xs"
            className="rounded-full bg-green-600 hover:bg-green-700 text-white p-2 w-8 h-8 flex items-center justify-center"
            title={getTranslation(language, "users.actions.add") || "Add User"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="sr-only">{getTranslation(language, "users.actions.add") || "Add User"}</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-4 text-left border-b dark:border-gray-600">
                  {getTranslation(language, "users.table.avatar")}
                </th>
                <th className="p-4 text-left border-b dark:border-gray-600">
                  {getTranslation(language, "users.table.name")}
                </th>
                <th className="p-4 text-left border-b dark:border-gray-600">
                  {getTranslation(language, "users.table.email")}
                </th>
                <th className="p-4 text-left border-b dark:border-gray-600">
                  {getTranslation(language, "users.table.phone")}
                </th>
                <th className="p-4 text-center border-b dark:border-gray-600">
                  {getTranslation(language, "users.table.active")}
                </th>
                <th className="p-4 text-center border-b dark:border-gray-600">
                  {getTranslation(language, "users.table.admin")}
                </th>
                <th className="p-4 text-center border-b dark:border-gray-600">
                  {getTranslation(language, "users.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="bg-white dark:bg-gray-800">
                  <td className="p-4">
                    <Avatar
                      img={user.avatarUrl || `/avatars/avatar${user.id}.jpg`}
                      rounded={true}
                      size="md"
                      className="w-10 h-10"
                    />
                  </td>
                  <td className="p-4 text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4 text-gray-900 dark:text-white">
                    {user.email}
                  </td>
                  <td className="p-4 text-gray-900 dark:text-white">
                    {user.phone || "—"}
                  </td>
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={user.active}
                      disabled
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={user.admin}
                      disabled
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                        {getTranslation(language, "users.table.edit")}
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700">
                        {getTranslation(language, "users.table.delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}


