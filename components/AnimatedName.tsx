'use client'

import { motion } from 'framer-motion'

export function AnimatedName() {
	return (
		<motion.h1
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-center lg:text-left whitespace-nowrap"
		>
			<motion.span
				className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent"
				style={{ backgroundSize: '200% 200%' }}
				animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
				transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
			>
				Saakshi Munot
			</motion.span>
		</motion.h1>
	)
}


