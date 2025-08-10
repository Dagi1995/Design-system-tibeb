"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, MoreVertical, Edit, Plus, Trash2, File, Dot } from "lucide-react"
import { Button } from "../atoms/Button"
import { cn } from "../../../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../atoms/Dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../atoms/Tooltip"
import { motion, AnimatePresence } from "framer-motion"

interface TreeNode {
  id: string
  label: string
  value?: number
  children?: TreeNode[]
  type?: string
}

interface TreeAction {
  id: string
  label: string
  icon: React.ReactNode
  action: (nodeId: string) => void
  variant?: "default" | "destructive"
}

interface TreeProps {
  data: TreeNode[]
  actions?: TreeAction[]
  className?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
}

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ data, actions = [], className, collapsible = true, defaultCollapsed = false }, ref) => {
    const [collapsedNodes, setCollapsedNodes] = React.useState<Record<string, boolean>>(() => {
      const initialState: Record<string, boolean> = {}
      if (defaultCollapsed) {
        data.forEach(node => {
          initialState[node.id] = true
          if (node.children) collapseAll(node.children)
        })
      }
      return initialState
    })

    const collapseAll = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        collapsedNodes[node.id] = true
        if (node.children) collapseAll(node.children)
      })
    }

    const toggleCollapse = (nodeId: string) => {
      if (!collapsible) return
      setCollapsedNodes(prev => ({
        ...prev,
        [nodeId]: !prev[nodeId]
      }))
    }

    const expandAll = () => setCollapsedNodes({})
    const collapseAllHandler = () => {
      const newCollapsed: Record<string, boolean> = {}
      data.forEach(node => {
        newCollapsed[node.id] = true
        if (node.children) collapseAll(node.children)
      })
      setCollapsedNodes(newCollapsed)
    }

    const formatValue = (value?: number) => {
      if (value === undefined) return "Br 0.00"
      return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value).replace('ETB', 'Br')
    }

    const defaultActions: TreeAction[] = [
      { id: 'edit', label: 'Edit', icon: <Edit className="h-4 w-4" />, action: () => {}, variant: 'default' },
      { id: 'add-child', label: 'Add Child', icon: <Plus className="h-4 w-4" />, action: () => {}, variant: 'default' },
      { id: 'delete', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, action: () => {}, variant: 'destructive' }
    ]

    const allActions = [...defaultActions, ...actions]

    const renderTree = (nodes: TreeNode[], level = 0) => {
      return nodes.map((node, index) => {
        const hasChildren = node.children && node.children.length > 0
        const isCollapsed = collapsedNodes[node.id] ?? false
        const isLastChild = index === nodes.length - 1

        return (
          <div key={node.id} className="relative">
            {level > 0 && (
              <div className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: `${level * 20 - 10}px` }}>
                <div className="w-px bg-gray-300 h-4"></div>
                {!isLastChild && <div className="w-px bg-gray-300 flex-1"></div>}
              </div>
            )}
            <motion.div
              className={cn("flex items-center gap-2 py-1 pl-4 hover:bg-gray-100 rounded transition-colors", {
                "bg-blue-50": node.id === '1003' // Highlight selected node
              })}
              style={{ paddingLeft: `${level * 20 + 12}px` }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {hasChildren && collapsible ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-transparent"
                  onClick={() => toggleCollapse(node.id)}
                >
                  {isCollapsed ? <ChevronRight className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                </Button>
              ) : <div className="h-6 w-6" />}
              <div className="flex items-center gap-2 flex-1">
                <File className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{node.label}</span>
                {node.value !== undefined && (
                  <span className="text-sm text-gray-600 ml-auto">{formatValue(node.value)}</span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-200">
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  {allActions.map((action) => (
                    <DropdownMenuItem
                      key={action.id}
                      onClick={() => action.action(node.id)}
                      className={cn(
                        "text-sm",
                        action.variant === 'destructive' && 'text-red-500 hover:text-red-700'
                      )}
                    >
                      {action.icon}
                      <span className="ml-2">{action.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
            <AnimatePresence>
              {hasChildren && !isCollapsed && (
                <motion.div
                  className="ml-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTree(node.children || [], level + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })
    }

    return (
      <div ref={ref} className={cn("relative w-full", className)}>
        <div className="flex gap-2 mb-2">
          <Button variant="outline" size="sm" onClick={expandAll} className="text-blue-600 hover:bg-blue-50">
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAllHandler} className="text-blue-600 hover:bg-blue-50">
            Collapse All
          </Button>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
          {renderTree(data)}
        </div>
      </div>
    )
  }
)
Tree.displayName = "Tree"

export { Tree }
export type { TreeNode, TreeProps, TreeAction }