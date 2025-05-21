'use client'

import { client } from '@/sanity/lib/client'
import { type Member } from '@/types/member'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function BandPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await client.fetch<Member[]>(`
        *[_type == "member"] | order(order asc) {
          "id": _id,
          name,
          "image": image.asset->url,
          role,
          bio,
          order
        }
      `)
      setMembers(data)
    }
    fetchMembers()
  }, [])

  return (
    <main className="min-h-screen">
      <section className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src="/youtube-banner.jpg" 
            alt="Band Hero Image" 
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </section>

      <section className="pb-16 px-4 w-4/5 mx-auto">
        <h2 className="text-5xl font py-24 text-center">Meet the Band</h2>
        <motion.div layout className="flex gap-8">
          <motion.div 
            layout
            className={`${
              selectedMember 
                ? 'w-1/3 py-4 max-h-screen overflow-y-auto scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-200 hover:scrollbar-thumb-neutral-600 [direction:rtl] [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]' 
                : 'w-full'
            } flex justify-center`}
          >
            <div 
              className={`flex gap-8 [direction:ltr] ${
                selectedMember 
                  ? 'flex-col' 
                  : 'flex-row flex-wrap justify-center'
              }`}
            >
              {members.map((member) => (
                <motion.div
                  layout
                  key={member.id}
                  className={`flex-shrink-0 flex flex-col items-center justify-center bg-black w-80 p-8 cursor-pointer ${
                    selectedMember?.id === member.id 
                      ? 'ring-2 ring-white' 
                      : 'hover:ring-2 hover:ring-white'
                  } transition-shadow`}
                  onClick={() => setSelectedMember(member)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                  {member.role && (
                    <p className="text-gray-400 text-center mt-2">{member.role}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {selectedMember && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-black w-3/4 p-8"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="mb-4 text-gray-400 hover:text-white"
              >
                ← Back to all members
              </button>
              <div className="space-y-6">
                <Image
                  src={selectedMember.image || '/placeholder-image.jpg'}
                  alt={selectedMember.name}
                  className="w-full h-96 object-cover rounded-lg"
                  width={1920}
                  height={1080}
                />
                <h2 className="text-3xl font-bold">{selectedMember.name}</h2>
                <p className="text-xl text-gray-400">{selectedMember.role}</p>
                <div className="prose prose-invert">
                  <p>{selectedMember.bio}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>
    </main>
  )
}
