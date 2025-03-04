import { useTheme } from "@emotion/react";
import {
	Grid,
	Skeleton,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { t } from "i18next";
import { useEffect } from "react";
import useParcelVideo from "../../api-manage/hooks/react-query/percel/useParcelVideo";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import ParcelInstruction from "./ParcelInstruction";
import CustomVideoPlayer from "./video-player/CustomVideoPlayer";

const ParcelVideo = () => {
	const theme = useTheme();
	const { data, refetch, isLoading } = useParcelVideo();
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
	useEffect(() => {
		refetch();
	}, []);

	const steps = [
		{
			label: data?.banner_contents[0]?.value,
			description: data?.banner_contents[1]?.value,
		},
		{
			label: data?.banner_contents[2]?.value,
			description: data?.banner_contents[3]?.value,
		},
		{
			label: data?.banner_contents[4]?.value,
			description: data?.banner_contents[5]?.value,
		},
	];

	return (
		<CustomStackFullWidth mt={{ xs: "20px", sm: "30px", md: "50px" }}>
			<Typography
				fontSize={{ xs: "16px", sm: "18px", md: "22px" }}
				fontWeight="700"
				textAlign={{ xs: "center", sm: "left", md: "left" }}
				component="h2"
			>
				{t("Easiest way to get services")}
			</Typography>
			<Grid container alignItems="center" spacing={2}>
				<Grid item xs={12} sm={6} md={7}>
					{" "}
					{isLoading ? (
						<Stack pt="1rem">
							<Skeleton
								variant="rectangular"
								animation="pulse"
								width="80%"
								height={400}
							/>
						</Stack>
					) : (
						<Stack>
							{data?.banner_type === "video" ? (
								<CustomVideoPlayer videoUrl={data?.banner_video} />
							) : data?.banner_type === "video_content" ? (
								<CustomVideoPlayer
									videoUrl={data?.banner_video_content_full_url}
								/>
							) : (
								<CustomImageContainer
									src={data?.banner_image_full_url}
									width="615px"
									objectfit="contain"
									padding={
										isSmall ? "20px 0px 0px 0px" : "25px 25px 0px 0px"
									}
									borderRadius="10px"
									smWidth="100%"
									smHeight="100%"
								/>
							)}
						</Stack>
					)}
				</Grid>
				<Grid item xs={12} sm={6} md={5} pl={{ xs: "5px" }}>
					{data?.banner_contents?.length > 0 && (
						<ParcelInstruction
							steps={steps}
							theme={theme}
							isLoading={isLoading}
						/>
					)}
				</Grid>
			</Grid>
		</CustomStackFullWidth>
	);
};

export default ParcelVideo;
