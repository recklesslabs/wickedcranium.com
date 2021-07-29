export type CardContent = {
    titleString: string,
    subtitleString?: string,
    contentString: string,
    bannerPicLink?: string,
    craniumNumber: string,
    buttons?: {
      buttonName: string,
      buttonLink: string
    }[]
  }