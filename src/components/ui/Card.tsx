import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    hover?: boolean
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-xl shadow-md overflow-hidden border border-border',
                hover && 'card-hover cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('p-6 pb-4', className)}>{children}</div>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('p-6 pt-0', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('p-6 pt-4 border-t border-border', className)}>{children}</div>
}
