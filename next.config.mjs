/** @type {import('next').NextConfig} */

// Old CMS slug -> new lowercase-hyphen slug. Slugs were renamed in Contentful on 1 Nov 2026;
// these permanent redirects keep old links and search results working.
const RENAMED_PROJECTS = {
  'MTV-Stein': 'mtv-stein-studio-hd-upgrade',
  'IFS_AUDI': 'ifs-auditorium-collaboration-system',
  'Sabaragamuwa_ConferenceSystem': 'sabaragamuwa-provincial-council-conference-system',
  'CEWAS-AV': 'cewas-lecture-rooms-auditorium',
  'DPCC-MAS': 'mas-digital-product-creation-centre',
  'TV-Monitoring': 'tv-radio-monitoring-system',
  'CHC-Srilanka': 'commercial-high-courts-digitisation',
  'Seamless-Edge': 'seamless-edge-blending-projection',
  'CIPLA-MEETING': 'cipla-boardroom',
  'Combank-HQ': 'commercial-bank-boardroom',
  'EAP-Broadcasting': 'eap-broadcasting-facility-relocation',
  'COPE': 'parliament-cope-copa-broadcast-system',
  'Sri_Dalada_Maligawa': 'sri-dalada-maligawa-hd-ob-bus',
  'CBC-TECH': 'cbc-tech-meeting-rooms',
  'Innovation-Boardroom': 'mas-intimates-innovation-boardroom',
  'CEO-MEETING': 'mas-intimates-ceo-meeting-room',
  'ADB-POLY': 'adb-boardroom',
  'MAS_FInance': 'mas-intimates-finance-meeting-room',
  'Sumathi-Group': 'sumathi-group-meeting-rooms',
  'Executive-Centre': 'executive-centre-meeting-rooms',
  'ITN-OB': 'itn-full-hd-ob-bus',
  'IWMI-MTRS': 'iwmi-director-general-amazon-rooms',
};

const RENAMED_POSTS = {
  'Child%20Friendly%20Court%20System': 'unicef-child-friendly-court-system',
  'COPE_LIVE': 'cope-copa-live-broadcasts-sri-lanka',
  'EDID-blog': 'why-edid-matters-av-distribution',
};

const nextConfig = {
  async redirects() {
    return [
      ...Object.entries(RENAMED_PROJECTS).map(([from, to]) => ({
        source: `/projects/${from}`,
        destination: `/projects/${to}`,
        permanent: true,
      })),
      ...Object.entries(RENAMED_POSTS).map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
