"use client"

import { useEffect, useState } from "react"
import { Table, Avatar, Button, Spinner, Card, Breadcrumb } from "flowbite-react"
import { HiTrash, HiHome, HiPencil } from "react-icons/hi"
import { Tooltip } from 'flowbite'
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
        if (Array.isArray(response)) {
          setUsers(response)
        } else {
          console.error("La respuesta no es un array:", response)
          setUsers([])
        }
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    // Inicializar todos los tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip-target]')
    tooltipElements.forEach((element) => {
      const targetId = element.getAttribute('data-tooltip-target')
      if (!targetId) return
      
      const target = document.getElementById(targetId)
      const triggerElement = element as HTMLElement
      if (target) {
        new Tooltip(target, triggerElement)
      }
    })
  }, [users]) // Re-inicializar cuando cambie la lista de usuarios

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center h-screen">
        <div className="ml-16"> 
          <Spinner size="xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Breadcrumb className="mb-4 ml-12">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          {getTranslation(language, "breadcrumb.home") || "Home"}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {getTranslation(language, "breadcrumb.users") || "Users"}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="mb-6">
        <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex-1 max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{getTranslation(language, "users.title")}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {getTranslation(language, "users.description") || "Manage your users and their permissions"}
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = '/users/new')}
            size="xs"
            className="rounded-full bg-green-600 hover:bg-green-700 text-white p-2 w-6 h-6 flex items-center justify-center"
            title={getTranslation(language, "users.actions.add") || "Add User"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="sr-only">{getTranslation(language, "users.actions.add") || "Add User"}</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable theme={{
            root: {
              base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
              shadow: "absolute bg-white dark:bg-gray-800 hidden group-hover:block",
            },
            body: {
              base: "group/body",
              cell: {
                base: "group-hover/body:bg-gray-50 dark:group-hover/body:bg-gray-600/50 px-6 py-4"
              }
            }
          }}>
            <Table.Head>
              <Table.HeadCell className="py-6 text-center">
                {getTranslation(language, "users.table.avatar")}
              </Table.HeadCell>
              <Table.HeadCell className="py-6">
                {getTranslation(language, "users.table.name")}
              </Table.HeadCell>
              <Table.HeadCell className="py-6">
                {getTranslation(language, "users.table.email")}
              </Table.HeadCell>
              <Table.HeadCell className="py-6">
                {getTranslation(language, "users.table.phone")}
              </Table.HeadCell>
              <Table.HeadCell className="py-6 text-center">
                {getTranslation(language, "users.table.active")}
              </Table.HeadCell>
              <Table.HeadCell className="py-6 text-center">
                {getTranslation(language, "users.table.admin")}
              </Table.HeadCell>
              <Table.HeadCell className="py-6 text-center">
                {getTranslation(language, "users.table.actions")}
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <Table.Row key={user.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Table.Cell>
                      <div className="flex justify-center items-center">
                        <Avatar
                          img={user.avatarUrl || `/avatars/avatar${user.id}.jpg`}
                          rounded
                          size="md"
                          className="w-10 h-10"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </Table.Cell>
                    <Table.Cell className="text-gray-500 dark:text-gray-400">
                      {user.email}
                    </Table.Cell>
                    <Table.Cell className="text-gray-500 dark:text-gray-400">
                      {user.phone || "—"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={user.active}
                          disabled
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={user.admin}
                          disabled
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-2">
                        <Button 
                          className="bg-primary hover:bg-primary-600 px-4 py-2"
                          onClick={() => window.location.href = `/users/${user.id}/edit`}
                          data-tooltip-target={`tooltip-edit-${user.id}`}
                        >
                          <HiPencil className="h-5 w-5 text-white" />
                        </Button>
                        <div 
                          id={`tooltip-edit-${user.id}`} 
                          role="tooltip" 
                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          {getTranslation(language, "users.table.edit") || "Edit user"}
                          <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>

                        <Button 
                          className="bg-red-600 hover:bg-red-700 px-4 py-2"
                          data-tooltip-target={`tooltip-delete-${user.id}`}
                        >
                          <HiTrash className="h-5 w-5 text-white" />
                        </Button>
                        <div 
                          id={`tooltip-delete-${user.id}`} 
                          role="tooltip" 
                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          {getTranslation(language, "users.table.delete") || "Delete user"}
                          <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={7} className="text-center py-4 text-gray-500 dark:text-gray-400">
                    {loading ? 'Cargando usuarios...' : 'No hay usuarios disponibles'}
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
