import Ads, {validateAds, validateUpdateAds} from '../models/Ads.js'
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 *  @desc Get ad By Id
 *  @route /api/ads/:id
 *  @method GET
 *  @access protected
 */
export  const getAdById = async (req, res) => {
    try{
        const ad = await Ads.findById(req.params.id);
        if (ad === null || ad.length === 0)
            return res.status(404).json({message: "Ad is not found"})

        res.status(200).json(ad)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

/**
 *  @desc Get All ads
 *  @route /api/ads/
 *  @method GET
 *  @access protected
 */
export  const getAllAds = async (req, res) => {
    try{
        const ads = await Ads.find({});
        if (ads === null || ads.length === 0)
            return res.status(404).json({message: "ads is not found"})

        res.status(200).json(ads)
    } catch(error){
        res.status(400).json({message: error.message})
    }
    
}


/**
 *  @desc Create New ad
 *  @route /api/ads/
 *  @method POST
 *  @access protected
 */
export const createNewAd = async (req, res) => {
    const {description, available} = req.body;
    const { error } = validateAds(req.body);
    if(error)
        return res.status(400).json({message: error.details[0].message});
    try {

        if(available){
            await Ads.updateMany({ available: true }, { $set: { available: false } });
        }

        // convert images to URL
        let image
        if (req.file)
            image = `${req.protocol}://${req.get("host")}/${req.file.filename}`
        
        const ad = await new Ads({
            description: description,
            image: image,
        });
        await ad.save();
        res.status(201).json(ad);

    } catch (error) {
        res.json({message: error.message})
    }

}

/**
 *  @desc Update ad
 *  @route /api/ads/:id
 *  @method Put
 *  @access protected
 */
export const updateAd = async (req, res) => {
    const { error } = validateUpdateAds(req.body);
    if(error)
        return res.status(400).json({message: error.details[0].message});

    try {
        const description = req.body.description || undefined;
        const available = req.body.available;
        let image = undefined;
        
        if(available){
            await Ads.updateMany({ available: true }, { $set: { available: false } });
        }

        let ad = await Ads.findById(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: "Ad not found" });
        }

        // convert images to URL
        if (req.file)
            image = `${req.protocol}://${req.get("host")}/${req.file.filename}`

        const updatedAd = await Ads.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    description: description,
                    image: image,
                    available: available
                }
            },
            { new: true } 
        );

        res.status(200).json(updatedAd);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


/**
 *  @desc Delete ad
 *  @route /api/ads/:id
 *  @method DELETE
 *  @access protected
 */
export const deleteAd = async (req, res)=>{
    try {
        let ad = await Ads.findById(req.params.id);
        if(!ad)
            return res.status(400).json({message: "the ad is not found."})

            const imagesfolder = path.join(__dirname, "../images")
            const imagePath = path.join(imagesfolder, ad.image.substring(ad.image.lastIndexOf('/') + 1));
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
        await ad.deleteOne();
        res.status(200).json({message: "the ad have been deleted successfully."})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}