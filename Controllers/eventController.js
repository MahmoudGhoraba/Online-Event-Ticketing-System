const userModel=require('../Models/user');
const eventModel=require('../Models/Event');

const eventController={
    getPostedEvents: async (req,res)=>{
        try{
         const events=await eventModel.find({user: req.user._id});
         return res.status(200).json(events);
        }catch(error){
          return res.status(500).json({message:error.message});
        }
    },
    createEvent: async (req,res)=>{

        // chech is this event was already created(no duplication)
        const event=new eventModel({
            title:req.body.title,
            description:req.body.description,
            date:req.body.date,
            location:req.body.location,
            category:req.body.category,
            ticketPrice:req.body.ticketPrice,
            remainingTickets:req.body.remainingTickets,
            totalNumberOfTickets:req.body.totalNumberOfTickets,
            Organizer:req.body.Organizer
        });
        try{
            const newEvent= await event.save();
            return res.status(201).json(newEvent);
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    },updateEvent: async (req,res)=>{
        //check for negative maybe dates
        try{
           const event=await eventModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
           );
           return res.status(200).json({event,message:"event updated successfully"});
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },deleteEvent: async (req,res)=>{
        try{
          const event= await eventModel.findByIdAndDelete(req.params.id);
          return res.status(200).json({event,message:"event deleted successfully"});
        }catch (error){
            return res.status(500).json({message:error.message})
        }
    },getOrganizerEventAnalytics: async (req,res)=>{
        try{
            const events=await eventModel.findById({Organizer:req.user.userId});
            // i need to check later!!!!!!!!!!11
            const analyticsResult=events.map((event)=>{
                const bookedEvents=event.totalNumberOfTickets-event.remainingTickets;
                const percentageOfTicketsPerEvent=(bookedEvents/event.totalNumberOfTickets)*100;
                return {
                    title:event.title,
                    percentageOfTicketsPerEvent:percentageOfTicketsPerEvent.toFixed(2)
                }
            });
            return res.status(200).json(analyticsResult);
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    }
    ,
    changeStatusOfEvent: async (req,res)=>{
        try{
          const event =await eventModel.findByIdAndUpdate(
            req.params.id,
            req.body.status,
            {new:true}
          );
          return res.status(200).json({event,message:`Event ${req.body.status} successfully`});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    }
};
module.exports=eventController;