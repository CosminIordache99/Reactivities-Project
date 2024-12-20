using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, option => option.MapFrom(source => source.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            //we need to create a new map bcs "Missing type map conf or unsupported mapping error in postman"
            //Mapping types:ActivityAttendee -> Profiles
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, option => option.MapFrom(source => source.AppUser.DisplayName))
                .ForMember(d => d.Username, option => option.MapFrom(source => source.AppUser.UserName))
                .ForMember(d => d.Bio, option => option.MapFrom(source => source.AppUser.Bio))
                .ForMember(d => d.Image, option => option.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<AppUser, Application.Profiles.Profile>()
                .ForMember(d => d.Image, option => option.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, option => option.MapFrom(source => source.Author.DisplayName))
                .ForMember(d => d.Username, option => option.MapFrom(source => source.Author.UserName))
                .ForMember(d => d.Image, option => option.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}