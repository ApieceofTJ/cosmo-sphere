import { useMember } from '@/integrations';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member, actions } = useMember();

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 px-6 py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Header */}
            <div className="bg-primary rounded-3xl p-12 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative">
                  {member?.profile?.photo?.url ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-secondary">
                      <Image
                        src={member.profile.photo.url}
                        alt={member.profile.nickname || 'Profile'}
                        className="w-full h-full object-cover"
                        width={128}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-16 h-16 text-secondary-foreground" />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary rounded-full" />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-2">
                    {member?.profile?.nickname || member?.contact?.firstName || 'Neural Explorer'}
                  </h1>
                  {member?.profile?.title && (
                    <p className="font-paragraph text-xl text-primary-foreground/80 mb-4">
                      {member.profile.title}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="bg-secondary/20 text-primary-foreground font-paragraph text-sm px-4 py-2 rounded-full">
                      {member?.status || 'Active'}
                    </span>
                    {member?.loginEmailVerified && (
                      <span className="bg-secondary text-secondary-foreground font-paragraph text-sm px-4 py-2 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-surfacealt text-foreground font-paragraph text-base px-6 py-3 rounded-2xl hover:bg-background transition-colors duration-300 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <motion.div
                className="bg-surfacealt rounded-3xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-secondary" />
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {member?.loginEmail && (
                    <div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">Email</p>
                      <p className="font-paragraph text-base text-foreground">{member.loginEmail}</p>
                    </div>
                  )}
                  {member?.contact?.firstName && (
                    <div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">First Name</p>
                      <p className="font-paragraph text-base text-foreground">{member.contact.firstName}</p>
                    </div>
                  )}
                  {member?.contact?.lastName && (
                    <div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">Last Name</p>
                      <p className="font-paragraph text-base text-foreground">{member.contact.lastName}</p>
                    </div>
                  )}
                  {member?.contact?.phones && member.contact.phones.length > 0 && (
                    <div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">Phone</p>
                      <p className="font-paragraph text-base text-foreground">{member.contact.phones[0]}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Account Details */}
              <motion.div
                className="bg-secondary rounded-3xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="font-heading text-2xl text-secondary-foreground mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-secondary-foreground" />
                  Account Details
                </h2>
                <div className="space-y-4">
                  {member?._createdDate && (
                    <div>
                      <p className="font-paragraph text-sm text-secondary-foreground/70 mb-1">Member Since</p>
                      <p className="font-paragraph text-base text-secondary-foreground">
                        {new Date(member._createdDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                  {member?.lastLoginDate && (
                    <div>
                      <p className="font-paragraph text-sm text-secondary-foreground/70 mb-1">Last Login</p>
                      <p className="font-paragraph text-base text-secondary-foreground">
                        {new Date(member.lastLoginDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                  {member?._updatedDate && (
                    <div>
                      <p className="font-paragraph text-sm text-secondary-foreground/70 mb-1">Profile Updated</p>
                      <p className="font-paragraph text-base text-secondary-foreground">
                        {new Date(member._updatedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Activity Section */}
            <motion.div
              className="bg-primary rounded-3xl p-12 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="font-heading text-3xl text-primary-foreground mb-6">
                Your Neural Journey
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                Welcome to your personal space in the neural network. Here you can track your mindmaps, 
                collaborations, and insights as you explore the interconnected world of ideas.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'Mindmaps Created', value: '0' },
                  { label: 'Connections Made', value: '0' },
                  { label: 'Ideas Explored', value: '0' }
                ].map((stat, i) => (
                  <div key={i} className="bg-primary-foreground/10 rounded-2xl p-6 text-center">
                    <p className="font-heading text-4xl text-secondary mb-2">{stat.value}</p>
                    <p className="font-paragraph text-base text-primary-foreground/80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
