export default {
  name: "release",
  title: "Music Release",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "coverArt",
      title: "Cover Art",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
      description: "The Spotify URL for the release",
    },
    {
      name: "embedUrl",
      title: "Track ID (Singles Only)",
      type: "string",
      description:
        'For singles only: Enter the Spotify track ID (the part after "track/" in the Spotify share URL)',
      hidden: ({ document }: { document: { type?: string } }) =>
        document?.type === "ep" || document?.type === "album",
    },
    {
      name: "albumEmbedUrl",
      title: "Album/EP ID",
      type: "string",
      description:
        'For EPs/albums only: Enter the Spotify album ID (the part after "album/" in the Spotify share URL)',
      hidden: ({ document }: { document: { type?: string } }) =>
        document?.type === "single",
      validation: (Rule: any) =>
        Rule.custom(
          (value: string, context: { document?: { type?: string } }) => {
            if (
              (context.document?.type === "ep" ||
                context.document?.type === "album") &&
              !value
            ) {
              return 'Album/EP ID is required for EP/album releases. Get this from the Spotify share URL (the part after "album/").';
            }
            return true;
          }
        ),
    },
    {
      name: "type",
      title: "Release Type",
      type: "string",
      options: {
        list: [
          { title: "Single", value: "single" },
          { title: "EP", value: "ep" },
          { title: "Album", value: "album" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "isLatest",
      title: "Is Latest Release",
      type: "boolean",
      description:
        "Mark this as the latest release to feature it on the home page",
    },
  ],
  orderings: [
    {
      title: "Release Date, New",
      name: "releaseDateDesc",
      by: [{ field: "releaseDate", direction: "desc" }],
    },
  ],
};
